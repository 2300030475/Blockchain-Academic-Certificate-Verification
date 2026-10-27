package com.certificate.certificate_verification_backend.service;

import org.springframework.stereotype.Service;

import com.certificate.certificate_verification_backend.entity.VerificationLog;
import com.certificate.certificate_verification_backend.entity.VerificationLogRepository;

@Service
public class VerificationLogService {

    private final VerificationLogRepository verificationLogRepository;

    public VerificationLogService(VerificationLogRepository verificationLogRepository) {
        this.verificationLogRepository = verificationLogRepository;
    }

    public VerificationLog saveLog(VerificationLog log) {
        return verificationLogRepository.save(log);
    }
}