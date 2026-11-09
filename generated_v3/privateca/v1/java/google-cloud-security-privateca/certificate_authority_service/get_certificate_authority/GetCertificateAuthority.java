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

// [START privateca_v1_certificateauthorityservice_certificateauthority_get]
import com.google.cloud.security.privateca.v1.CertificateAuthority;
import com.google.cloud.security.privateca.v1.CertificateAuthorityName;
import com.google.cloud.security.privateca.v1.CertificateAuthorityServiceClient;
import java.io.IOException;

public class GetCertificateAuthority {

  public static void main(String[] args) throws IOException {
    String projectId = "example-project-id";
    String locationId = "example-location-id";
    String caPoolId = "example-ca-pool-id";
    String certificateAuthorityId = "example-certificate-authority-id";
    getCertificateAuthority(projectId, locationId, caPoolId, certificateAuthorityId);
  }

  public static void getCertificateAuthority(
      String projectId, String locationId, String caPoolId, String certificateAuthorityId)
      throws IOException {
    try (CertificateAuthorityServiceClient client = CertificateAuthorityServiceClient.create()) {
      String name =
          CertificateAuthorityName.of(projectId, locationId, caPoolId, certificateAuthorityId)
              .toString();

      CertificateAuthority certificateAuthority = client.getCertificateAuthority(name);

      System.out.println("Certificate Authority Name: " + certificateAuthority.getName());
      System.out.println("State: " + certificateAuthority.getState());
      System.out.println("Tier: " + certificateAuthority.getTier());
    }
  }
}
// [END privateca_v1_certificateauthorityservice_certificateauthority_get]
