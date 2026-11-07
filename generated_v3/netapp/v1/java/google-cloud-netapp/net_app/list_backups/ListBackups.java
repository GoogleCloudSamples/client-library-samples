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

package com.google.cloud.netapp.v1;

// [START netapp_v1_netapp_backups_list]
import com.google.cloud.netapp.v1.Backup;
import com.google.cloud.netapp.v1.BackupVaultName;
import com.google.cloud.netapp.v1.NetAppClient;

public class ListBackups {

  public static void main(String[] args) throws Exception {
    String backupVaultId = "example-backup_vault_id";
    String projectId = "example-project_id";
    String locationId = "example-location_id";
    listBackups(backupVaultId, projectId, locationId);
  }

  public static void listBackups(String backupVaultId, String projectId, String locationId)
      throws Exception {
    try (NetAppClient client = NetAppClient.create()) {
      String parent = BackupVaultName.of(projectId, locationId, backupVaultId).toString();
      for (Backup backup : client.listBackups(parent).iterateAll()) {
        System.out.println("Backup name: " + backup.getName());
        System.out.println("Backup state: " + backup.getState());
      }
    }
  }
}
// [END netapp_v1_netapp_backups_list]
