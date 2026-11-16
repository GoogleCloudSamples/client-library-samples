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

// [START certificatemanager_v1_certificatemanager_certificatemapentry_create]
import com.google.cloud.certificatemanager.v1.CertificateManagerClient;
import com.google.cloud.certificatemanager.v1.CertificateMapEntry;
import com.google.cloud.certificatemanager.v1.CertificateMapName;
import com.google.cloud.certificatemanager.v1.CertificateName;
import java.io.IOException;
import java.util.concurrent.ExecutionException;
import java.util.concurrent.TimeUnit;
import java.util.concurrent.TimeoutException;

public class CreateCertificateMapEntry {

  public static void main(String[] args) throws Exception {
    String projectId = "example-project_id";
    String locationId = "example-location_id";
    String certificateMapId = "example-certificate_map_id";
    String certificateMapEntryId = "example-certificate_map_entry_id";
    String certificateId = "example-certificate_id";
    createCertificateMapEntry(
        projectId, locationId, certificateMapId, certificateMapEntryId, certificateId);
  }

  public static void createCertificateMapEntry(
      String projectId,
      String locationId,
      String certificateMapId,
      String certificateMapEntryId,
      String certificateId)
      throws Exception {
    try (CertificateManagerClient client = CertificateManagerClient.create()) {
      String parent = CertificateMapName.of(projectId, locationId, certificateMapId).toString();
      String certificate = CertificateName.of(projectId, locationId, certificateId).toString();
      CertificateMapEntry certificateMapEntry =
          CertificateMapEntry.newBuilder()
              .setHostname("example.com")
              .addCertificates(certificate)
              .build();

      CertificateMapEntry response =
          client
              .createCertificateMapEntryAsync(parent, certificateMapEntry, certificateMapEntryId)
              .get(5, TimeUnit.MINUTES);

      System.out.println("Created certificate map entry: " + response.getName());
    }
  }
}
// [END certificatemanager_v1_certificatemanager_certificatemapentry_create]
