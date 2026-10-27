package com.certificate.certificate_verification_backend.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "verification_logs")
public class VerificationLog {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long logId;

    private String certificateNumber;

    private String verifiedHash;

    private String result;

    private String verifiedBy;

    private LocalDateTime verifiedAt;

    public VerificationLog() {
    }

    public VerificationLog(String certificateNumber, String verifiedHash,
                            String result, String verifiedBy,
                            LocalDateTime verifiedAt) {
        this.certificateNumber = certificateNumber;
        this.verifiedHash = verifiedHash;
        this.result = result;
        this.verifiedBy = verifiedBy;
        this.verifiedAt = verifiedAt;
    }

    public Long getLogId() {
        return logId;
    }

    public void setLogId(Long logId) {
        this.logId = logId;
    }

    public String getCertificateNumber() {
        return certificateNumber;
    }

    public void setCertificateNumber(String certificateNumber) {
        this.certificateNumber = certificateNumber;
    }

    public String getVerifiedHash() {
        return verifiedHash;
    }

    public void setVerifiedHash(String verifiedHash) {
        this.verifiedHash = verifiedHash;
    }

    public String getResult() {
        return result;
    }

    public void setResult(String result) {
        this.result = result;
    }

    public String getVerifiedBy() {
        return verifiedBy;
    }

    public void setVerifiedBy(String verifiedBy) {
        this.verifiedBy = verifiedBy;
    }

    public LocalDateTime getVerifiedAt() {
        return verifiedAt;
    }

    public void setVerifiedAt(LocalDateTime verifiedAt) {
        this.verifiedAt = verifiedAt;
    }
}