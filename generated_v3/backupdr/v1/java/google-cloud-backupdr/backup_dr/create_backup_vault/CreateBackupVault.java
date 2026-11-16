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

// [START backupdr_v1_backupdr_backupvault_create]
import com.google.cloud.backupdr.v1.BackupDRClient;
import com.google.cloud.backupdr.v1.BackupVault;
import com.google.protobuf.Duration;
import java.io.IOException;
import java.util.concurrent.ExecutionException;
import java.util.concurrent.TimeUnit;
import java.util.concurrent.TimeoutException;

public class CreateBackupVault {

  public static void main(String[] args) throws Exception {
    String backupVaultId = "example-backup-vault-id";
    String projectId = "example-project-id";
    String locationId = "example-location-id";
    createBackupVault(backupVaultId, projectId, locationId);
  }

  public static void createBackupVault(String backupVaultId, String projectId, String locationId)
      throws Exception {
    try (BackupDRClient client = BackupDRClient.create()) {
      String parent = String.format("projects/%s/locations/%s", projectId, locationId);
      BackupVault backupVault =
          BackupVault.newBuilder()
              .setBackupMinimumEnforcedRetentionDuration(
                  Duration.newBuilder().setSeconds(86400).build())
              .build();

      // Initiate the long-running operation and wait for completion.
      BackupVault response =
          client
              .createBackupVaultAsync(parent, backupVault, backupVaultId)
              .get(10, TimeUnit.MINUTES);

      System.out.println("Created backup vault: " + response.getName());
    }
  }
}
// [END backupdr_v1_backupdr_backupvault_create]
