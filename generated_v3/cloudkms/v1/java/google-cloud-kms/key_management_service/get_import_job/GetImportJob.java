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

// [START cloudkms_v1_keymanagementservice_importjob_get]
import com.google.cloud.kms.v1.ImportJob;
import com.google.cloud.kms.v1.ImportJobName;
import com.google.cloud.kms.v1.KeyManagementServiceClient;
import java.io.IOException;

public class GetImportJob {

  public static void main(String[] args) throws IOException {
    String projectId = "example-project-id";
    String locationId = "example-location-id";
    String keyRingId = "example-key-ring-id";
    String importJobId = "example-import-job-id";
    getImportJob(projectId, locationId, keyRingId, importJobId);
  }

  public static void getImportJob(
      String projectId, String locationId, String keyRingId, String importJobId)
      throws IOException {
    try (KeyManagementServiceClient client = KeyManagementServiceClient.create()) {
      String name = ImportJobName.of(projectId, locationId, keyRingId, importJobId).toString();

      ImportJob importJob = client.getImportJob(name);

      System.out.println("Import job name: " + importJob.getName());
      System.out.println("Import job state: " + importJob.getState());
    }
  }
}
// [END cloudkms_v1_keymanagementservice_importjob_get]
