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

package com.google.cloud.backupdr.v1;

// [START backupdr_v1_backupdr_initialize_service]
import com.google.cloud.backupdr.v1.BackupDRClient;
import com.google.cloud.backupdr.v1.InitializeServiceRequest;
import com.google.cloud.backupdr.v1.InitializeServiceResponse;
import java.io.IOException;
import java.util.concurrent.ExecutionException;
import java.util.concurrent.TimeUnit;
import java.util.concurrent.TimeoutException;

public class InitializeService {

  public static void main(String[] args) throws Exception {
    String projectId = "example-project_id";
    String locationId = "example-location_id";
    initializeService(projectId, locationId);
  }

  public static void initializeService(String projectId, String locationId) throws Exception {
    try (BackupDRClient client = BackupDRClient.create()) {
      String name = String.format("projects/%s/locations/%s/serviceConfig", projectId, locationId);
      String resourceType = "compute.googleapis.com/Instance";

      InitializeServiceRequest request =
          InitializeServiceRequest.newBuilder()
              .setName(name)
              .setResourceType(resourceType)
              .build();

      // InitializeService is a long-running operation; wait for it to complete.
      InitializeServiceResponse response =
          client.initializeServiceAsync(request).get(10, TimeUnit.MINUTES);
      System.out.println("Service initialized: " + response.getBackupVaultName());
    }
  }
}
// [END backupdr_v1_backupdr_initialize_service]
