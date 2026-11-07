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

// [START netapp_v1_netapp_backupvault_create]
import com.google.api.gax.rpc.ResourceExhaustedException;
import com.google.cloud.netapp.v1.BackupVault;
import com.google.cloud.netapp.v1.LocationName;
import com.google.cloud.netapp.v1.NetAppClient;
import java.util.concurrent.ExecutionException;

public class CreateBackupVault {

  public static void main(String[] args) throws Exception {
    if (args.length >= 3) {
      String projectId = args[0];
      String locationId = args[1];
      String backupVaultId = args[2];
      createBackupVault(projectId, locationId, backupVaultId);
    }
  }

  public static void createBackupVault(
      String projectId, String locationId, String backupVaultId) throws Exception {
    try (NetAppClient client = NetAppClient.create()) {
      String parent = LocationName.of(projectId, locationId).toString();
      BackupVault backupVault =
          BackupVault.newBuilder().setDescription("Example backup vault").build();

      try {
        BackupVault response =
            client.createBackupVaultAsync(parent, backupVault, backupVaultId).get();
        System.out.println("Created backup vault: " + response.getName());
      } catch (ResourceExhaustedException e) {
        System.out.println("Quota exceeded for backup vaults in region: " + locationId);
      } catch (ExecutionException e) {
        if (e.getCause() instanceof ResourceExhaustedException) {
          System.out.println("Quota exceeded for backup vaults in region: " + locationId);
        } else {
          throw e;
        }
      }
    }
  }
}
// [END netapp_v1_netapp_backupvault_create]
