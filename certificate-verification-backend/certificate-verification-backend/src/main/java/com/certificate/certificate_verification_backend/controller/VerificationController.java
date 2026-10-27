package com.certificate.certificate_verification_backend.controller;

import java.security.MessageDigest;
import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import com.certificate.certificate_verification_backend.entity.Certificate;
import com.certificate.certificate_verification_backend.entity.VerificationLog;
import com.certificate.certificate_verification_backend.service.CertificateService;
import com.certificate.certificate_verification_backend.service.VerificationLogService;

@RestController
@RequestMapping("/api/verification")
@CrossOrigin(origins = {
        "http://localhost:5173",
        "http://localhost:5174"
})
public class VerificationController {

    private final VerificationLogService verificationLogService;
    private final CertificateService certificateService;

    public VerificationController(
            VerificationLogService verificationLogService,
            CertificateService certificateService) {

        this.verificationLogService = verificationLogService;
        this.certificateService = certificateService;
    }

    // Actual certificate verification
    @PostMapping(
            value = "/verify",
            consumes = "multipart/form-data"
    )
    public ResponseEntity<?> verifyCertificate(
            @RequestParam String certificateNumber,
            @RequestParam("certificateFile") MultipartFile certificateFile,
            @RequestParam(defaultValue = "VERIFIER") String verifiedBy) {

        try {

            // 1. Check PDF
            if (certificateFile == null || certificateFile.isEmpty()) {

                return ResponseEntity.badRequest()
                        .body("Certificate PDF is required.");
            }

            // 2. Check file type
            String contentType = certificateFile.getContentType();

            if (contentType == null ||
                    !contentType.equalsIgnoreCase("application/pdf")) {

                return ResponseEntity.badRequest()
                        .body("Only PDF certificate files are allowed.");
            }

            // 3. Find trusted certificate record
            Optional<Certificate> certificateOptional =
                    certificateService.findByCertificateNumber(
                            certificateNumber.trim()
                    );

            // 4. Certificate not found
            if (certificateOptional.isEmpty()) {

                VerificationLog log =
                        new VerificationLog(
                                certificateNumber,
                                null,
                                "CERTIFICATE NOT FOUND",
                                verifiedBy,
                                LocalDateTime.now()
                        );

                verificationLogService.saveLog(log);

                Map<String, Object> response =
                        new HashMap<>();

                response.put(
                        "result",
                        "CERTIFICATE NOT FOUND"
                );

                response.put(
                        "message",
                        "No certificate record was found for this certificate number."
                );

                return ResponseEntity.ok(response);
            }

            Certificate certificate =
                    certificateOptional.get();

            // 5. Generate SHA-256 hash of uploaded PDF
            String uploadedHash =
                    generateSHA256(
                            certificateFile.getBytes()
                    );

            // 6. Get trusted hash from MySQL
            String storedHash =
                    certificate.getCertificateHash();

            String result;

            // 7. Compare hashes
            if (storedHash != null &&
                    storedHash.equalsIgnoreCase(uploadedHash)) {

                result = "VERIFIED";

            } else {

                result = "NOT VERIFIED / TAMPERED";
            }

            // 8. Save verification log
            VerificationLog log =
                    new VerificationLog(
                            certificateNumber,
                            uploadedHash,
                            result,
                            verifiedBy,
                            LocalDateTime.now()
                    );

            verificationLogService.saveLog(log);

            // 9. Prepare response
            Map<String, Object> response =
                    new HashMap<>();

            response.put("result", result);
            response.put(
                    "certificateNumber",
                    certificate.getCertificateNumber()
            );
            response.put(
                    "studentId",
                    certificate.getStudentId()
            );
            response.put(
                    "studentName",
                    certificate.getStudentName()
            );
            response.put(
                    "certificateHash",
                    storedHash
            );
            response.put(
                    "verifiedHash",
                    uploadedHash
            );
            response.put(
                    "ipfsCid",
                    certificate.getIpfsCid()
            );

            return ResponseEntity.ok(response);

        } catch (Exception e) {

            return ResponseEntity.internalServerError()
                    .body(
                            "Certificate verification failed: "
                                    + e.getMessage()
                    );
        }
    }

    // Existing log endpoint
    @PostMapping("/log")
    public ResponseEntity<VerificationLog> saveVerificationLog(
            @RequestBody VerificationLog log) {

        if (log.getVerifiedAt() == null) {
            log.setVerifiedAt(LocalDateTime.now());
        }

        VerificationLog savedLog =
                verificationLogService.saveLog(log);

        return ResponseEntity.ok(savedLog);
    }

    // SHA-256 generation
    private String generateSHA256(byte[] fileBytes)
            throws Exception {

        MessageDigest digest =
                MessageDigest.getInstance("SHA-256");

        byte[] hash =
                digest.digest(fileBytes);

        StringBuilder hexString =
                new StringBuilder();

        for (byte b : hash) {

            String hex =
                    Integer.toHexString(
                            0xff & b
                    );

            if (hex.length() == 1) {
                hexString.append('0');
            }

            hexString.append(hex);
        }

        return hexString.toString();
    }
}