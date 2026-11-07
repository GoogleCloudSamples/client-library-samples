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

package com.google.cloud.cloudkms.v1;

// [START cloudkms_v1_keymanagementservice_importjob_create]
import com.google.cloud.kms.v1.ImportJob;
import com.google.cloud.kms.v1.KeyManagementServiceClient;
import com.google.cloud.kms.v1.KeyRingName;
import com.google.cloud.kms.v1.ProtectionLevel;
import java.io.IOException;

public class CreateImportJob {

  public static void main(String[] args) throws Exception {
    String importJobId = "example-import-job-id";
    String projectId = "example-project-id";
    String locationId = "example-location-id";
    String keyRingId = "example-key-ring-id";
    createImportJob(importJobId, projectId, locationId, keyRingId);
  }

  public static void createImportJob(
      String importJobId, String projectId, String locationId, String keyRingId)
      throws Exception {
    // Initialize the client with Application Default Credentials
    try (KeyManagementServiceClient client = KeyManagementServiceClient.create()) {
      String parent = KeyRingName.of(projectId, locationId, keyRingId).toString();

      // Configure the import job with required cryptographic wrapping parameters
      ImportJob importJob =
          ImportJob.newBuilder()
              .setImportMethod(ImportJob.ImportMethod.RSA_OAEP_3072_SHA256_AES_256)
              .setProtectionLevel(ProtectionLevel.HSM)
              .build();

      ImportJob response = client.createImportJob(parent, importJobId, importJob);

      System.out.printf("Created import job: %s%n", response.getName());
      System.out.printf("Import job state: %s%n", response.getState());
    }
  }
}
// [END cloudkms_v1_keymanagementservice_importjob_create]
