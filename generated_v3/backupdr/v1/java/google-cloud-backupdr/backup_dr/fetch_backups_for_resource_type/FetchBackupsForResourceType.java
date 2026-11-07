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

// [START backupdr_v1_backupdr_fetch_backups_for_resource_type]
import com.google.cloud.backupdr.v1.Backup;
import com.google.cloud.backupdr.v1.BackupDRClient;
import com.google.cloud.backupdr.v1.FetchBackupsForResourceTypeRequest;

public class FetchBackupsForResourceType {

  public static void main(String[] args) throws Exception {
    String projectId = "example-project-id";
    String locationId = "us-central1";
    String backupVaultId = "example-backup-vault-id";
    String datasourceId = "example-datasource-id";
    fetchBackupsForResourceType(projectId, locationId, backupVaultId, datasourceId);
  }

  public static void fetchBackupsForResourceType(
      String projectId, String locationId, String backupVaultId, String datasourceId)
      throws Exception {
    // Initialize the client using Application Default Credentials (ADC).
    try (BackupDRClient client = BackupDRClient.create()) {
      String resourceType = "compute.googleapis.com/Instance";
      String parent =
          String.format(
              "projects/%s/locations/%s/backupVaults/%s/dataSources/%s",
              projectId, locationId, backupVaultId, datasourceId);

      FetchBackupsForResourceTypeRequest request =
          FetchBackupsForResourceTypeRequest.newBuilder()
              .setParent(parent)
              .setResourceType(resourceType)
              .build();

      for (Backup backup : client.fetchBackupsForResourceType(request).iterateAll()) {
        System.out.println("Backup: " + backup.getName());
      }
    }
  }
}
// [END backupdr_v1_backupdr_fetch_backups_for_resource_type]
