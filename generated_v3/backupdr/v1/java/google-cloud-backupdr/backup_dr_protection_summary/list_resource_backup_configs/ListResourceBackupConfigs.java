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

// [START backupdr_v1_backupdrprotectionsummary_resourcebackupconfigs_list]
import com.google.cloud.backupdr.v1.BackupDrProtectionSummaryClient;
import com.google.cloud.backupdr.v1.ListResourceBackupConfigsRequest;
import com.google.cloud.backupdr.v1.LocationName;
import com.google.cloud.backupdr.v1.ResourceBackupConfig;
import java.io.IOException;

public class ListResourceBackupConfigs {

  public static void listResourceBackupConfigs(String projectId, String locationId)
      throws IOException {
    // Initialize client that will be used to send requests. This client only needs to be created
    // once, and can be reused for multiple requests.
    try (BackupDrProtectionSummaryClient client = BackupDrProtectionSummaryClient.create()) {
      String parent = LocationName.of(projectId, locationId).toString();

      ListResourceBackupConfigsRequest request =
          ListResourceBackupConfigsRequest.newBuilder().setParent(parent).build();

      for (ResourceBackupConfig resourceBackupConfig :
          client.listResourceBackupConfigs(request).iterateAll()) {
        System.out.println("Resource backup config: " + resourceBackupConfig.getName());
      }
    }
  }
}
// [END backupdr_v1_backupdrprotectionsummary_resourcebackupconfigs_list]
