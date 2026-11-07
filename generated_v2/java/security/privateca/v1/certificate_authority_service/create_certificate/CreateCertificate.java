// Copyright 2026 Google LLC
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

package com.google.cloud.privateca.v1;

// [START privateca_v1_certificateauthorityservice_certificate_create]
import com.google.cloud.security.privateca.v1.CaPoolName;
import com.google.cloud.security.privateca.v1.Certificate;
import com.google.cloud.security.privateca.v1.CertificateAuthorityServiceClient;
import com.google.cloud.security.privateca.v1.CertificateConfig;
import com.google.cloud.security.privateca.v1.KeyUsage;
import com.google.cloud.security.privateca.v1.PublicKey;
import com.google.cloud.security.privateca.v1.Subject;
import com.google.cloud.security.privateca.v1.X509Parameters;
import com.google.protobuf.ByteString;
import com.google.protobuf.Duration;
import java.security.KeyPair;
import java.security.KeyPairGenerator;
import java.util.Base64;

public class CreateCertificate {

  public static void main(String[] args) throws Exception {
    String projectId = "example-project-id";
    String locationId = "example-location-id";
    String caPoolId = "example-ca-pool-id";
    String certificateId = "example-certificate-id";
    createCertificate(projectId, locationId, caPoolId, certificateId);
  }

  public static void createCertificate(
      String projectId, String locationId, String caPoolId, String certificateId) throws Exception {
    try (CertificateAuthorityServiceClient client = CertificateAuthorityServiceClient.create()) {
      String parent = CaPoolName.of(projectId, locationId, caPoolId).toString();

      // Generate an RSA-2048 key pair to populate the public key parameter.
      KeyPairGenerator keyPairGenerator = KeyPairGenerator.getInstance("RSA");
      keyPairGenerator.initialize(2048);
      KeyPair keyPair = keyPairGenerator.generateKeyPair();
      String pemPublicKey =
          "-----BEGIN PUBLIC KEY-----\n"
              + Base64.getMimeEncoder(64, new byte[] {'\n'})
                  .encodeToString(keyPair.getPublic().getEncoded())
              + "\n-----END PUBLIC KEY-----\n";

      PublicKey publicKey =
          PublicKey.newBuilder()
              .setKey(ByteString.copyFromUtf8(pemPublicKey))
              .setFormat(PublicKey.KeyFormat.PEM)
              .build();

      Subject subject =
          Subject.newBuilder()
              .setCommonName("example.com")
              .setOrganization("Example LLC")
              .build();

      CertificateConfig.SubjectConfig subjectConfig =
          CertificateConfig.SubjectConfig.newBuilder().setSubject(subject).build();

      KeyUsage.KeyUsageOptions keyUsageOptions =
          KeyUsage.KeyUsageOptions.newBuilder()
              .setDigitalSignature(true)
              .setKeyEncipherment(true)
              .build();

      KeyUsage keyUsage = KeyUsage.newBuilder().setBaseKeyUsage(keyUsageOptions).build();

      X509Parameters x509Parameters = X509Parameters.newBuilder().setKeyUsage(keyUsage).build();

      CertificateConfig certificateConfig =
          CertificateConfig.newBuilder()
              .setPublicKey(publicKey)
              .setSubjectConfig(subjectConfig)
              .setX509Config(x509Parameters)
              .build();

      // Configure a certificate with a 1-day lifetime and structured parameters.
      Certificate certificate =
          Certificate.newBuilder()
              .setLifetime(Duration.newBuilder().setSeconds(86400).build())
              .setConfig(certificateConfig)
              .build();

      Certificate response = client.createCertificate(parent, certificate, certificateId);
      System.out.println("Created certificate: " + response.getName());
    }
  }
}
// [END privateca_v1_certificateauthorityservice_certificate_create]
