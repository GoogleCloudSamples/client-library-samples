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

// [START netapp_v1_netapp_backupvault_update]
import com.google.cloud.netapp.v1.BackupVault;
import com.google.cloud.netapp.v1.BackupVaultName;
import com.google.cloud.netapp.v1.NetAppClient;
import com.google.protobuf.FieldMask;
import java.io.IOException;
import java.util.concurrent.ExecutionException;

public class UpdateBackupVault {

  public static void main(String[] args) throws Exception {
    String projectId = "example-project_id";
    String locationId = "example-location_id";
    String backupVaultId = "example-backup_vault_id";
    updateBackupVault(projectId, locationId, backupVaultId);
  }

  public static void updateBackupVault(
      String projectId, String locationId, String backupVaultId)
      throws IOException, ExecutionException, InterruptedException {
    try (NetAppClient client = NetAppClient.create()) {
      BackupVault backupVault =
          BackupVault.newBuilder()
              .setName(BackupVaultName.of(projectId, locationId, backupVaultId).toString())
              .setDescription("Updated backup vault description")
              .build();
      FieldMask updateMask = FieldMask.newBuilder().addPaths("description").build();

      BackupVault response = client.updateBackupVaultAsync(backupVault, updateMask).get();
      System.out.println("Updated backup vault: " + response.getName());
      System.out.println("Description: " + response.getDescription());
    }
  }
}
// [END netapp_v1_netapp_backupvault_update]
