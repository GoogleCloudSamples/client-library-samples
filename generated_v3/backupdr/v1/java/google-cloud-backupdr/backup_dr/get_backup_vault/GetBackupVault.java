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

// [START backupdr_v1_backupdr_backupvault_get]
import com.google.cloud.backupdr.v1.BackupDRClient;
import com.google.cloud.backupdr.v1.BackupVault;
import com.google.cloud.backupdr.v1.BackupVaultName;
import java.io.IOException;

public class GetBackupVault {

  public static void main(String[] args) throws Exception {
    String projectId = "example-project-id";
    String locationId = "example-location-id";
    String backupVaultId = "example-backup-vault-id";
    getBackupVault(projectId, locationId, backupVaultId);
  }

  public static void getBackupVault(String projectId, String locationId, String backupVaultId)
      throws Exception {
    // Initialize client that will be used to send requests. This client only needs to be created
    // once, and can be reused for multiple requests.
    try (BackupDRClient client = BackupDRClient.create()) {
      String name = BackupVaultName.of(projectId, locationId, backupVaultId).toString();

      BackupVault response = client.getBackupVault(name);

      System.out.println("Retrieved backup vault: " + response.getName());
      System.out.println("Backup vault state: " + response.getState());
    }
  }
}
// [END backupdr_v1_backupdr_backupvault_get]
