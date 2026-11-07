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

// [START backupdr_v1_backupdr_backupvault_delete]
import com.google.cloud.backupdr.v1.BackupDRClient;
import com.google.cloud.backupdr.v1.BackupVaultName;

import java.io.IOException;
import java.util.concurrent.ExecutionException;
import java.util.concurrent.TimeUnit;
import java.util.concurrent.TimeoutException;

public class DeleteBackupVault {

  public static void main(String[] args) throws Exception {
    String projectId = "example-project_id";
    String locationId = "example-location_id";
    String backupVaultId = "example-backup_vault_id";
    deleteBackupVault(projectId, locationId, backupVaultId);
  }

  public static void deleteBackupVault(String projectId, String locationId, String backupVaultId) throws Exception {
    try (BackupDRClient client = BackupDRClient.create()) {
      String name = BackupVaultName.of(projectId, locationId, backupVaultId).toString();
      // DeleteBackupVault is a long-running operation; wait for it to complete.
      client.deleteBackupVaultAsync(name).get();
      System.out.printf("Deleted backup vault: %s%n", name);
    }
  }
}
// [END backupdr_v1_backupdr_backupvault_delete]
