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

// [START privateca_v1_certificateauthorityservice_disable_certificate_authority]
import com.google.cloud.security.privateca.v1.CertificateAuthority;
import com.google.cloud.security.privateca.v1.CertificateAuthorityName;
import com.google.cloud.security.privateca.v1.CertificateAuthorityServiceClient;
import com.google.cloud.security.privateca.v1.DisableCertificateAuthorityRequest;
import java.io.IOException;
import java.util.concurrent.ExecutionException;
import java.util.concurrent.TimeUnit;
import java.util.concurrent.TimeoutException;

public class DisableCertificateAuthority {

  public static void main(String[] args)
      throws IOException, ExecutionException, InterruptedException, TimeoutException {
    String projectId = "example-project-id";
    String locationId = "example-location-id";
    String caPoolId = "example-ca-pool-id";
    String certificateAuthorityId = "example-certificate-authority-id";
    disableCertificateAuthority(projectId, locationId, caPoolId, certificateAuthorityId);
  }

  public static void disableCertificateAuthority(
      String projectId, String locationId, String caPoolId, String certificateAuthorityId)
      throws IOException, ExecutionException, InterruptedException, TimeoutException {
    try (CertificateAuthorityServiceClient client = CertificateAuthorityServiceClient.create()) {
      String name =
          CertificateAuthorityName.of(projectId, locationId, caPoolId, certificateAuthorityId)
              .toString();

      DisableCertificateAuthorityRequest request =
          DisableCertificateAuthorityRequest.newBuilder().setName(name).build();

      // Wait for the long-running operation to complete.
      CertificateAuthority certificateAuthority =
          client.disableCertificateAuthorityAsync(request).get(5, TimeUnit.MINUTES);

      System.out.println("Disabled Certificate Authority: " + certificateAuthority.getName());
      System.out.println("Current state: " + certificateAuthority.getState());
    }
  }
}
// [END privateca_v1_certificateauthorityservice_disable_certificate_authority]
