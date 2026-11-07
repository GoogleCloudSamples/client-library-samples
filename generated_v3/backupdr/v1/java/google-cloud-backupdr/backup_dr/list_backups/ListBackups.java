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

// [START backupdr_v1_backupdr_backups_list]
import com.google.cloud.backupdr.v1.Backup;
import com.google.cloud.backupdr.v1.BackupDRClient;
import com.google.cloud.backupdr.v1.ListBackupsRequest;

public class ListBackups {

  public static void main(String[] args) throws Exception {
    String projectId = "example-project-id";
    String locationId = "example-location-id";
    String backupVaultId = "example-backup-vault-id";
    String dataSourceId = "example-data-source-id";
    listBackups(projectId, locationId, backupVaultId, dataSourceId);
  }

  public static void listBackups(
      String projectId, String locationId, String backupVaultId, String dataSourceId)
      throws Exception {
    // Initialize client that will be closed when the block exits.
    try (BackupDRClient client = BackupDRClient.create()) {
      String parent =
          String.format(
              "projects/%s/locations/%s/backupVaults/%s/dataSources/%s",
              projectId, locationId, backupVaultId, dataSourceId);

      ListBackupsRequest request = ListBackupsRequest.newBuilder().setParent(parent).build();

      for (Backup backup : client.listBackups(request).iterateAll()) {
        System.out.println("Backup name: " + backup.getName());
      }
    }
  }
}
// [END backupdr_v1_backupdr_backups_list]
