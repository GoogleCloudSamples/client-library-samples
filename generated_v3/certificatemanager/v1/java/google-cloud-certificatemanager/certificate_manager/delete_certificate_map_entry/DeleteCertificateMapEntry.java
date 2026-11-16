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

// [START certificatemanager_v1_certificatemanager_certificatemapentry_delete]
import com.google.cloud.certificatemanager.v1.CertificateManagerClient;
import com.google.cloud.certificatemanager.v1.CertificateMapEntryName;
import java.io.IOException;
import java.util.concurrent.ExecutionException;
import java.util.concurrent.TimeUnit;
import java.util.concurrent.TimeoutException;

public class DeleteCertificateMapEntry {

  public static void main(String[] args) throws Exception {
    String projectId = "example-project_id";
    String locationId = "example-location_id";
    String certificateMapId = "example-certificate_map_id";
    String certificateMapEntryId = "example-certificate_map_entry_id";
    deleteCertificateMapEntry(projectId, locationId, certificateMapId, certificateMapEntryId);
  }

  public static void deleteCertificateMapEntry(
      String projectId, String locationId, String certificateMapId, String certificateMapEntryId)
      throws Exception {
    try (CertificateManagerClient client = CertificateManagerClient.create()) {
      String name =
          CertificateMapEntryName.of(
                  projectId, locationId, certificateMapId, certificateMapEntryId)
              .toString();

      // Wait for the long-running operation to complete.
      client.deleteCertificateMapEntryAsync(name).get(5, TimeUnit.MINUTES);
      System.out.println("Deleted certificate map entry: " + name);
    }
  }
}
// [END certificatemanager_v1_certificatemanager_certificatemapentry_delete]
