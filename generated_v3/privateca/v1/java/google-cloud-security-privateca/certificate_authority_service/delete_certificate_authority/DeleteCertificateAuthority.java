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

// [START privateca_v1_certificateauthorityservice_certificateauthority_delete]
import com.google.cloud.security.privateca.v1.CertificateAuthority;
import com.google.cloud.security.privateca.v1.CertificateAuthorityName;
import com.google.cloud.security.privateca.v1.CertificateAuthorityServiceClient;
import com.google.cloud.security.privateca.v1.DeleteCertificateAuthorityRequest;
import java.util.concurrent.TimeUnit;

public class DeleteCertificateAuthority {

  public static void main(String[] args) throws Exception {
    String projectId = "example-project-id";
    String locationId = "example-location-id";
    String caPoolId = "example-ca-pool-id";
    String certificateAuthorityId = "example-certificate-authority-id";
    deleteCertificateAuthority(projectId, locationId, caPoolId, certificateAuthorityId);
  }

  public static void deleteCertificateAuthority(
      String projectId, String locationId, String caPoolId, String certificateAuthorityId)
      throws Exception {
    try (CertificateAuthorityServiceClient client = CertificateAuthorityServiceClient.create()) {
      String name =
          CertificateAuthorityName.of(projectId, locationId, caPoolId, certificateAuthorityId)
              .toString();

      DeleteCertificateAuthorityRequest request =
          DeleteCertificateAuthorityRequest.newBuilder().setName(name).build();

      // Deleting a Certificate Authority is a long-running operation; wait for it to complete.
      CertificateAuthority certificateAuthority =
          client.deleteCertificateAuthorityAsync(request).get(5, TimeUnit.MINUTES);

      System.out.println("Deleted Certificate Authority: " + certificateAuthority.getName());
    }
  }
}
// [END privateca_v1_certificateauthorityservice_certificateauthority_delete]
