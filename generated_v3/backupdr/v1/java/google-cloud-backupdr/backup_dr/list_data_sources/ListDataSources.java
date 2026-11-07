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

// [START backupdr_v1_backupdr_datasources_list]
import com.google.cloud.backupdr.v1.BackupDRClient;
import com.google.cloud.backupdr.v1.DataSource;
import java.io.IOException;

public class ListDataSources {

  public static void main(String[] args) throws Exception {
    String projectId = "example-project_id";
    String locationId = "example-location_id";
    String backupVaultId = "example-backup_vault_id";
    listDataSources(projectId, locationId, backupVaultId);
  }

  // Lists data sources in the specified backup vault.
  public static void listDataSources(String projectId, String locationId, String backupVaultId)
      throws Exception {
    try (BackupDRClient client = BackupDRClient.create()) {
      String parent =
          String.format("projects/%s/locations/%s/backupVaults/%s", projectId, locationId, backupVaultId);

      for (DataSource dataSource : client.listDataSources(parent).iterateAll()) {
        System.out.println("Data source name: " + dataSource.getName());
        System.out.println("Data source state: " + dataSource.getState());
      }
    }
  }
}
// [END backupdr_v1_backupdr_datasources_list]
