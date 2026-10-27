package com.certificate.certificate_verification_backend.controller;

import java.security.MessageDigest;
import java.time.LocalDateTime;
import java.util.Optional;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import com.certificate.certificate_verification_backend.entity.Certificate;
import com.certificate.certificate_verification_backend.service.CertificateService;
import com.certificate.certificate_verification_backend.service.PinataService;

@RestController
@RequestMapping("/api/certificates")
@CrossOrigin(origins = {
        "http://localhost:5173",
        "http://localhost:5174"
})
public class CertificateController {

    private final CertificateService certificateService;
    private final PinataService pinataService;

    public CertificateController(
            CertificateService certificateService,
            PinataService pinataService) {

        this.certificateService = certificateService;
        this.pinataService = pinataService;
    }

    // Register certificate
    @PostMapping(consumes = "multipart/form-data")
    public ResponseEntity<?> registerCertificate(
            @RequestParam String certificateNumber,
            @RequestParam String studentId,
            @RequestParam String studentName,
            @RequestParam("certificateFile") MultipartFile certificateFile) {

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

            // 3. Check duplicate certificate number
            Optional<Certificate> existing =
                    certificateService.findByCertificateNumber(certificateNumber);

            if (existing.isPresent()) {
                return ResponseEntity.badRequest()
                        .body("A certificate with this number already exists.");
            }

            // 4. Generate SHA-256 hash
            String certificateHash =
                    generateSHA256(certificateFile.getBytes());

            // 5. Upload PDF to Pinata IPFS
            String ipfsCid =
                    pinataService.uploadFile(
                            certificateFile.getBytes(),
                            certificateFile.getOriginalFilename()
                    );

            // 6. Create certificate record
            Certificate certificate =
                    new Certificate(
                            certificateNumber,
                            studentId,
                            studentName,
                            certificateHash,
                            ipfsCid,
                            LocalDateTime.now()
                    );

            // 7. Save certificate in MySQL
            Certificate savedCertificate =
                    certificateService.saveCertificate(certificate);

            return ResponseEntity.ok(savedCertificate);

        } catch (Exception e) {

            return ResponseEntity.internalServerError()
                    .body("Certificate registration failed: "
                            + e.getMessage());
        }
    }

    // Get all certificate records
    @GetMapping
    public ResponseEntity<?> getAllCertificates() {

        return ResponseEntity.ok(
                certificateService.getAllCertificates()
        );
    }

    // Get certificate by certificate number
    @GetMapping("/{certificateNumber}")
    public ResponseEntity<Certificate> getCertificate(
            @PathVariable String certificateNumber) {

        Optional<Certificate> certificate =
                certificateService.findByCertificateNumber(certificateNumber);

        if (certificate.isEmpty()) {
            return ResponseEntity.notFound().build();
        }

        return ResponseEntity.ok(certificate.get());
    }

    // Generate SHA-256 hash
    private String generateSHA256(byte[] fileBytes) throws Exception {

        MessageDigest digest =
                MessageDigest.getInstance("SHA-256");

        byte[] hash =
                digest.digest(fileBytes);

        StringBuilder hexString =
                new StringBuilder();

        for (byte b : hash) {

            String hex =
                    Integer.toHexString(0xff & b);

            if (hex.length() == 1) {
                hexString.append('0');
            }

            hexString.append(hex);
        }

        return hexString.toString();
    }
}