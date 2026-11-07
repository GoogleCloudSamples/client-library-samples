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

// [START file_v1beta1_cloudfilestoremanager_backup_delete]
import com.google.cloud.filestore.v1beta1.CloudFilestoreManagerClient;
import java.io.IOException;
import java.util.concurrent.ExecutionException;

public class DeleteBackup {

  public static void main(String[] args)
      throws IOException, InterruptedException, ExecutionException {
    String projectId = "example-project-id";
    String locationId = "example-location-id";
    String backupId = "example-backup-id";
    deleteBackup(projectId, locationId, backupId);
  }

  public static void deleteBackup(String projectId, String locationId, String backupId)
      throws IOException, InterruptedException, ExecutionException {
    try (CloudFilestoreManagerClient client = CloudFilestoreManagerClient.create()) {
      String name =
          String.format("projects/%s/locations/%s/backups/%s", projectId, locationId, backupId);

      // DeleteBackup is a long-running operation; wait for it to complete.
      client.deleteBackupAsync(name).get();
      System.out.println("Deleted backup: " + name);
    }
  }
}
// [END file_v1beta1_cloudfilestoremanager_backup_delete]
