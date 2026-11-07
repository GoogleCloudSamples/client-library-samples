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

// [START backupdr_v1_backupdr_backupvault_update]
import com.google.api.gax.rpc.AbortedException;
import com.google.cloud.backupdr.v1.BackupDRClient;
import com.google.cloud.backupdr.v1.BackupVault;
import com.google.cloud.backupdr.v1.BackupVaultName;
import com.google.protobuf.FieldMask;
import java.io.IOException;
import java.util.concurrent.ExecutionException;
import java.util.concurrent.TimeUnit;
import java.util.concurrent.TimeoutException;

public class UpdateBackupVault {

  public static void main(String[] args) throws Exception {
    String projectId = "example-project-id";
    String locationId = "us-central1";
    String backupVaultId = "example-backup-vault-id";
    updateBackupVault(projectId, locationId, backupVaultId);
  }

  public static void updateBackupVault(
      String projectId, String locationId, String backupVaultId) throws Exception {
    try (BackupDRClient client = BackupDRClient.create()) {
      FieldMask updateMask = FieldMask.newBuilder().addPaths("description").build();
      BackupVault backupVault =
          BackupVault.newBuilder()
              .setName(BackupVaultName.of(projectId, locationId, backupVaultId).toString())
              .setDescription("Updated description")
              .build();

      // Retry if the backup vault is still being initialized from recent creation.
      BackupVault response = null;
      for (int attempt = 0; attempt < 30; attempt++) {
        try {
          response =
              client.updateBackupVaultAsync(backupVault, updateMask).get(5, TimeUnit.MINUTES);
          break;
        } catch (ExecutionException e) {
          if (e.getCause() instanceof AbortedException && attempt < 29) {
            TimeUnit.SECONDS.sleep(10);
            continue;
          }
          throw e;
        } catch (AbortedException e) {
          if (attempt < 29) {
            TimeUnit.SECONDS.sleep(10);
            continue;
          }
          throw e;
        }
      }

      System.out.println("Updated backup vault: " + response.getName());
      System.out.println("Description: " + response.getDescription());
    }
  }
}
// [END backupdr_v1_backupdr_backupvault_update]
