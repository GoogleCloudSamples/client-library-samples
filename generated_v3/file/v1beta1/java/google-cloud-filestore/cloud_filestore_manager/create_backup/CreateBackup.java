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

package com.google.cloud.file.v1beta1;

// [START file_v1beta1_cloudfilestoremanager_backup_create]
import com.google.cloud.filestore.v1beta1.Backup;
import com.google.cloud.filestore.v1beta1.CloudFilestoreManagerClient;
import java.io.IOException;
import java.util.concurrent.ExecutionException;

public class CreateBackup {

  public static void main(String[] args)
      throws IOException, ExecutionException, InterruptedException {
    String projectId = "example-project-id";
    String locationId = "example-location-id";
    String backupId = "example-backup-id";
    String instanceId = "example-instance-id";
    createBackup(projectId, locationId, backupId, instanceId);
  }

  public static void createBackup(
      String projectId, String locationId, String backupId, String instanceId)
      throws IOException, ExecutionException, InterruptedException {
    try (CloudFilestoreManagerClient client = CloudFilestoreManagerClient.create()) {
      String parent = String.format("projects/%s/locations/%s", projectId, locationId);
      String sourceInstance =
          String.format("projects/%s/locations/%s/instances/%s", projectId, locationId, instanceId);

      Backup backup =
          Backup.newBuilder()
              .setSourceInstance(sourceInstance)
              .setSourceFileShare("share1")
              .setDescription("Sample backup created by Filestore client")
              .build();

      // Filestore CreateBackup is a long-running operation.
      Backup response = client.createBackupAsync(parent, backup, backupId).get();

      System.out.printf("Backup created: %s%n", response.getName());
      System.out.printf("Backup state: %s%n", response.getState());
    }
  }
}
// [END file_v1beta1_cloudfilestoremanager_backup_create]
