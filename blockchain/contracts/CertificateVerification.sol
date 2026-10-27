// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract CertificateVerification {

    struct Certificate {
        string certificateNumber;
        string certificateHash;
        string ipfsCid;
    }

    mapping(string => Certificate) private certificates;

    event CertificateStored(
        string certificateNumber,
        string certificateHash,
        string ipfsCid
    );

    function storeCertificate(
        string memory certificateNumber,
        string memory certificateHash,
        string memory ipfsCid
    ) public {
        certificates[certificateNumber] = Certificate(
            certificateNumber,
            certificateHash,
            ipfsCid
        );

        emit CertificateStored(
            certificateNumber,
            certificateHash,
            ipfsCid
        );
    }

    function getCertificate(
        string memory certificateNumber
    )
        public
        view
        returns (
            string memory,
            string memory,
            string memory
        )
    {
        Certificate memory certificate =
            certificates[certificateNumber];

        return (
            certificate.certificateNumber,
            certificate.certificateHash,
            certificate.ipfsCid
        );
    }
}