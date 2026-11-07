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

// [START certificatemanager_v1_certificatemanager_certificatemapentry_update]
import com.google.cloud.certificatemanager.v1.CertificateManagerClient;
import com.google.cloud.certificatemanager.v1.CertificateMapEntry;
import com.google.cloud.certificatemanager.v1.CertificateMapEntryName;
import com.google.protobuf.FieldMask;
import java.io.IOException;
import java.util.concurrent.ExecutionException;
import java.util.concurrent.TimeUnit;
import java.util.concurrent.TimeoutException;

public class UpdateCertificateMapEntry {

  public static void main(String[] args) throws Exception {
    String projectId = "example-project-id";
    String locationId = "example-location-id";
    String certificateMapId = "example-certificate-map-id";
    String certificateMapEntryId = "example-certificate-map-entry-id";
    updateCertificateMapEntry(projectId, locationId, certificateMapId, certificateMapEntryId);
  }

  public static void updateCertificateMapEntry(
      String projectId,
      String locationId,
      String certificateMapId,
      String certificateMapEntryId)
      throws Exception {
    try (CertificateManagerClient client = CertificateManagerClient.create()) {
      // Define the field mask specifying which fields to update
      FieldMask updateMask = FieldMask.newBuilder().addPaths("description").build();

      // Configure the certificate map entry resource with updated attributes
      CertificateMapEntry certificateMapEntry =
          CertificateMapEntry.newBuilder()
              .setName(
                  CertificateMapEntryName.of(
                          projectId, locationId, certificateMapId, certificateMapEntryId)
                      .toString())
              .setDescription("Updated description for certificate map entry")
              .build();

      // Wait for the long-running update operation to complete
      CertificateMapEntry response =
          client
              .updateCertificateMapEntryAsync(certificateMapEntry, updateMask)
              .get(300, TimeUnit.SECONDS);

      System.out.printf("Updated certificate map entry: %s%n", response.getName());
    }
  }
}
// [END certificatemanager_v1_certificatemanager_certificatemapentry_update]
