package com.certificate.certificate_verification_backend.service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.certificate.certificate_verification_backend.entity.Certificate;
import com.certificate.certificate_verification_backend.entity.CertificateRepository;

@Service
public class CertificateService {

    private final CertificateRepository certificateRepository;

    public CertificateService(CertificateRepository certificateRepository) {
        this.certificateRepository = certificateRepository;
    }

    public Certificate saveCertificate(Certificate certificate) {

        if (certificate.getCreatedAt() == null) {
            certificate.setCreatedAt(LocalDateTime.now());
        }

        return certificateRepository.save(certificate);
    }

    public Optional<Certificate> findByCertificateNumber(
            String certificateNumber) {

        return certificateRepository
                .findByCertificateNumber(certificateNumber);
    }

    public List<Certificate> getAllCertificates() {

        return certificateRepository.findAll();
    }
}