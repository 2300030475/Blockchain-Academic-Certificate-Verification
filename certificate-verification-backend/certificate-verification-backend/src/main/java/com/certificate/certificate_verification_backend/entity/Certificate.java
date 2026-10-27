package com.certificate.certificate_verification_backend.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "certificates")
public class Certificate {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long certificateId;

    @Column(unique = true, nullable = false)
    private String certificateNumber;

    @Column(nullable = false)
    private String studentId;

    @Column(nullable = false)
    private String studentName;

    @Column(nullable = false, length = 64)
    private String certificateHash;

    @Column(nullable = false)
    private String ipfsCid;

    private LocalDateTime createdAt;

    public Certificate() {
    }

    public Certificate(String certificateNumber, String studentId,
                       String studentName, String certificateHash,
                       String ipfsCid, LocalDateTime createdAt) {
        this.certificateNumber = certificateNumber;
        this.studentId = studentId;
        this.studentName = studentName;
        this.certificateHash = certificateHash;
        this.ipfsCid = ipfsCid;
        this.createdAt = createdAt;
    }

    public Long getCertificateId() {
        return certificateId;
    }

    public void setCertificateId(Long certificateId) {
        this.certificateId = certificateId;
    }

    public String getCertificateNumber() {
        return certificateNumber;
    }

    public void setCertificateNumber(String certificateNumber) {
        this.certificateNumber = certificateNumber;
    }

    public String getStudentId() {
        return studentId;
    }

    public void setStudentId(String studentId) {
        this.studentId = studentId;
    }

    public String getStudentName() {
        return studentName;
    }

    public void setStudentName(String studentName) {
        this.studentName = studentName;
    }

    public String getCertificateHash() {
        return certificateHash;
    }

    public void setCertificateHash(String certificateHash) {
        this.certificateHash = certificateHash;
    }

    public String getIpfsCid() {
        return ipfsCid;
    }

    public void setIpfsCid(String ipfsCid) {
        this.ipfsCid = ipfsCid;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }
}