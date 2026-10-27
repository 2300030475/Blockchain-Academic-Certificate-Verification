package com.certificate.certificate_verification_backend.entity;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface CertificateRepository extends JpaRepository<Certificate, Long> {

    Optional<Certificate> findByCertificateNumber(String certificateNumber);
}