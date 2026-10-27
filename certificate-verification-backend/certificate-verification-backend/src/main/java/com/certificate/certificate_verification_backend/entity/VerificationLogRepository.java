package com.certificate.certificate_verification_backend.entity;

import org.springframework.data.jpa.repository.JpaRepository;

public interface VerificationLogRepository extends JpaRepository<VerificationLog, Long> {
}