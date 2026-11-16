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

// [START certificatemanager_v1_certificatemanager_certificate_get]
import com.google.cloud.certificatemanager.v1.Certificate;
import com.google.cloud.certificatemanager.v1.CertificateManagerClient;
import com.google.cloud.certificatemanager.v1.CertificateName;

public class GetCertificate {

  public static void main(String[] args) throws Exception {
    String projectId = "example-project_id";
    String locationId = "example-location_id";
    String certificateId = "example-certificate_id";
    getCertificate(projectId, locationId, certificateId);
  }

  public static void getCertificate(String projectId, String locationId, String certificateId)
      throws Exception {
    try (CertificateManagerClient client = CertificateManagerClient.create()) {
      String name = CertificateName.of(projectId, locationId, certificateId).toString();

      Certificate certificate = client.getCertificate(name);
      System.out.println("Certificate name: " + certificate.getName());
      System.out.println("Description: " + certificate.getDescription());
    }
  }
}
// [END certificatemanager_v1_certificatemanager_certificate_get]
