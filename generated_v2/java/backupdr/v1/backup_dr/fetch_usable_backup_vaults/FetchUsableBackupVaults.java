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

// [START backupdr_v1_backupdr_fetch_usable_backup_vaults]
import com.google.cloud.backupdr.v1.BackupDRClient;
import com.google.cloud.backupdr.v1.BackupVault;
import com.google.cloud.backupdr.v1.FetchUsableBackupVaultsRequest;

public class FetchUsableBackupVaults {

  public static void main(String[] args) throws Exception {
    // TODO(developer): Replace these variables before running the sample.
    String projectId = "example-project-id";
    String locationId = "example-location-id";
    fetchUsableBackupVaults(projectId, locationId);
  }

  // Fetches usable backup vaults for a given project and location.
  public static void fetchUsableBackupVaults(String projectId, String locationId) throws Exception {
    try (BackupDRClient client = BackupDRClient.create()) {
      String parent = String.format("projects/%s/locations/%s", projectId, locationId);

      FetchUsableBackupVaultsRequest request =
          FetchUsableBackupVaultsRequest.newBuilder().setParent(parent).build();

      for (BackupVault backupVault : client.fetchUsableBackupVaults(request).iterateAll()) {
        System.out.printf("Backup vault: %s%n", backupVault.getName());
      }
    }
  }
}
// [END backupdr_v1_backupdr_fetch_usable_backup_vaults]
