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

// [START privateca_v1_certificateauthorityservice_certificate_get]
import com.google.cloud.security.privateca.v1.Certificate;
import com.google.cloud.security.privateca.v1.CertificateAuthorityServiceClient;
import com.google.cloud.security.privateca.v1.CertificateName;
import java.io.IOException;

public class GetCertificate {

  public static void main(String[] args) throws IOException {
    String projectId = "example-project-id";
    String locationId = "example-location-id";
    String caPoolId = "example-ca-pool-id";
    String certificateId = "example-certificate-id";
    getCertificate(projectId, locationId, caPoolId, certificateId);
  }

  public static void getCertificate(
      String projectId, String locationId, String caPoolId, String certificateId)
      throws IOException {
    try (CertificateAuthorityServiceClient client = CertificateAuthorityServiceClient.create()) {
      String name = CertificateName.of(projectId, locationId, caPoolId, certificateId).toString();

      Certificate certificate = client.getCertificate(name);

      System.out.println("Certificate name: " + certificate.getName());
      System.out.println("Issuer CA: " + certificate.getIssuerCertificateAuthority());
      System.out.println("Create time: " + certificate.getCreateTime());
    }
  }
}
// [END privateca_v1_certificateauthorityservice_certificate_get]
