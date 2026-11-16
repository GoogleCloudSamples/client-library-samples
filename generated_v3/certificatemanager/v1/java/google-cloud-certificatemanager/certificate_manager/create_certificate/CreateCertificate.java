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

package com.google.cloud.certificatemanager.v1;

// [START certificatemanager_v1_certificatemanager_certificate_create]
import com.google.cloud.certificatemanager.v1.Certificate;
import com.google.cloud.certificatemanager.v1.CertificateManagerClient;
import java.io.IOException;
import java.util.concurrent.ExecutionException;
import java.util.concurrent.TimeUnit;
import java.util.concurrent.TimeoutException;

public class CreateCertificate {

  public static void main(String[] args) throws Exception {
    String projectId = "example-project-id";
    String locationId = "global";
    String certificateId = "example-certificate-id";
    createCertificate(projectId, locationId, certificateId);
  }

  public static void createCertificate(String projectId, String locationId, String certificateId)
      throws IOException, ExecutionException, InterruptedException, TimeoutException {
    try (CertificateManagerClient client = CertificateManagerClient.create()) {
      // Google-managed certificates with load balancer authorization must be created in the global location.
      if (locationId == null || !locationId.equals("global")) {
        locationId = "global";
      }
      String parent = String.format("projects/%s/locations/%s", projectId, locationId);
      Certificate certificate =
          Certificate.newBuilder()
              .setDescription("Sample managed certificate")
              .setManaged(
                  Certificate.ManagedCertificate.newBuilder()
                      .addDomains("example.com")
                      .build())
              .build();

      Certificate response =
          client.createCertificateAsync(parent, certificate, certificateId).get(5, TimeUnit.MINUTES);
      System.out.println("Created certificate: " + response.getName());
    }
  }
}
// [END certificatemanager_v1_certificatemanager_certificate_create]
