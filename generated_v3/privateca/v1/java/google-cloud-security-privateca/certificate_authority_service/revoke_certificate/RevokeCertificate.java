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

// [START privateca_v1_certificateauthorityservice_revoke_certificate]
import com.google.cloud.security.privateca.v1.Certificate;
import com.google.cloud.security.privateca.v1.CertificateAuthorityServiceClient;
import com.google.cloud.security.privateca.v1.CertificateName;
import com.google.cloud.security.privateca.v1.RevocationReason;
import com.google.cloud.security.privateca.v1.RevokeCertificateRequest;
import java.io.IOException;

public class RevokeCertificate {

  public static void main(String[] args) throws Exception {
    String projectId = "example-project_id";
    String locationId = "example-location_id";
    String caPoolId = "example-ca_pool_id";
    String certificateId = "example-certificate_id";
    revokeCertificate(projectId, locationId, caPoolId, certificateId);
  }

  public static void revokeCertificate(
      String projectId, String locationId, String caPoolId, String certificateId)
      throws Exception {
    try (CertificateAuthorityServiceClient client = CertificateAuthorityServiceClient.create()) {
      String name = CertificateName.of(projectId, locationId, caPoolId, certificateId).toString();
      RevocationReason reason = RevocationReason.KEY_COMPROMISE;

      RevokeCertificateRequest request =
          RevokeCertificateRequest.newBuilder()
              .setName(name)
              .setReason(reason)
              .build();

      Certificate certificate = client.revokeCertificate(request);
      System.out.println("Revoked certificate: " + certificate.getName());
    }
  }
}
// [END privateca_v1_certificateauthorityservice_revoke_certificate]
