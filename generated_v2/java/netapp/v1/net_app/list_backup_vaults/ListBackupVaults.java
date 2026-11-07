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

// [START netapp_v1_netapp_backupvaults_list]
import com.google.cloud.netapp.v1.BackupVault;
import com.google.cloud.netapp.v1.LocationName;
import com.google.cloud.netapp.v1.NetAppClient;

public class ListBackupVaults {

  public static void main(String[] args) throws Exception {
    String projectId = "example-project_id";
    String locationId = "example-location_id";
    listBackupVaults(projectId, locationId);
  }

  public static void listBackupVaults(String projectId, String locationId) throws Exception {
    // Initialize the client in a try-with-resources block for automatic cleanup.
    try (NetAppClient client = NetAppClient.create()) {
      String parent = LocationName.of(projectId, locationId).toString();
      for (BackupVault backupVault : client.listBackupVaults(parent).iterateAll()) {
        System.out.println("Backup Vault: " + backupVault.getName());
      }
    }
  }
}
// [END netapp_v1_netapp_backupvaults_list]
