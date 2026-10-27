package com.certificate.certificate_verification_backend.service;

import java.io.IOException;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;

@Service
public class PinataService {

    @Value("${pinata.jwt}")
    private String pinataJwt;

    @Value("${pinata.gateway}")
    private String pinataGateway;

    private final RestTemplate restTemplate;

    public PinataService() {
        this.restTemplate = new RestTemplate();
    }

    public String uploadFile(byte[] fileBytes, String fileName) throws IOException {

        String uploadUrl = "https://uploads.pinata.cloud/v3/files";

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.MULTIPART_FORM_DATA);
        headers.setBearerAuth(pinataJwt);

        ByteArrayResource fileResource = new ByteArrayResource(fileBytes) {
            @Override
            public String getFilename() {
                return fileName;
            }
        };

        MultiValueMap<String, Object> body = new LinkedMultiValueMap<>();
        body.add("file", fileResource);
        body.add("network", "public");

        HttpEntity<MultiValueMap<String, Object>> requestEntity =
                new HttpEntity<>(body, headers);

        String response = restTemplate.postForObject(
                uploadUrl,
                requestEntity,
                String.class
        );

        // Extract CID from Pinata response
        Pattern pattern = Pattern.compile(
                "\"cid\"\\s*:\\s*\"([^\"]+)\""
        );

        Matcher matcher = pattern.matcher(response);

        if (!matcher.find()) {
            throw new RuntimeException(
                    "Pinata upload succeeded but CID was not found in the response."
            );
        }

        return matcher.group(1);
    }

    public String getGatewayUrl(String cid) {
        return "https://" + pinataGateway + "/ipfs/" + cid;
    }
}