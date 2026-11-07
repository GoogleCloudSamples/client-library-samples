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

// [START privateca_v1_certificateauthorityservice_certificateauthority_update]
import com.google.cloud.security.privateca.v1.CertificateAuthority;
import com.google.cloud.security.privateca.v1.CertificateAuthorityServiceClient;
import com.google.protobuf.FieldMask;
import java.io.IOException;
import java.util.concurrent.ExecutionException;
import java.util.concurrent.TimeUnit;
import java.util.concurrent.TimeoutException;

public class UpdateCertificateAuthority {

  public static void main(String[] args)
      throws IOException, ExecutionException, InterruptedException, TimeoutException {
    String projectId = "example-project-id";
    String locationId = "example-location-id";
    String caPoolId = "example-ca-pool-id";
    String certificateAuthorityId = "example-certificate-authority-id";
    updateCertificateAuthority(projectId, locationId, caPoolId, certificateAuthorityId);
  }

  public static void updateCertificateAuthority(
      String projectId, String locationId, String caPoolId, String certificateAuthorityId)
      throws IOException, ExecutionException, InterruptedException, TimeoutException {
    try (CertificateAuthorityServiceClient client = CertificateAuthorityServiceClient.create()) {
      // Specify field mask to safely update labels without modifying other fields
      FieldMask updateMask = FieldMask.newBuilder().addPaths("labels").build();
      String certificateAuthorityName =
          String.format(
              "projects/%s/locations/%s/caPools/%s/certificateAuthorities/%s",
              projectId, locationId, caPoolId, certificateAuthorityId);
      CertificateAuthority certificateAuthority =
          CertificateAuthority.newBuilder()
              .setName(certificateAuthorityName)
              .putLabels("env", "test")
              .build();

      // Wait for the long-running operation to complete
      CertificateAuthority response =
          client
              .updateCertificateAuthorityAsync(certificateAuthority, updateMask)
              .get(5, TimeUnit.MINUTES);

      System.out.println("Updated Certificate Authority: " + response.getName());
    }
  }
}
// [END privateca_v1_certificateauthorityservice_certificateauthority_update]
