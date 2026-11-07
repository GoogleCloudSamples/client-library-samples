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

// [START netapp_v1_netapp_backuppolicy_update]
import com.google.cloud.netapp.v1.BackupPolicy;
import com.google.cloud.netapp.v1.BackupPolicyName;
import com.google.cloud.netapp.v1.NetAppClient;
import com.google.protobuf.FieldMask;

public class UpdateBackupPolicy {

  public static void main(String[] args) throws Exception {
    String projectId = "example-project_id";
    String locationId = "example-location_id";
    String backupPolicyId = "example-backup_policy_id";
    updateBackupPolicy(projectId, locationId, backupPolicyId);
  }

  public static void updateBackupPolicy(
      String projectId, String locationId, String backupPolicyId) throws Exception {
    // Initialize the NetApp client using Application Default Credentials.
    try (NetAppClient client = NetAppClient.create()) {
      BackupPolicy backupPolicy =
          BackupPolicy.newBuilder()
              .setName(BackupPolicyName.of(projectId, locationId, backupPolicyId).toString())
              .setDescription("Updated description for backup policy")
              .build();
      FieldMask updateMask = FieldMask.newBuilder().addPaths("description").build();

      // Update the backup policy and wait for the long-running operation to complete.
      BackupPolicy response = client.updateBackupPolicyAsync(backupPolicy, updateMask).get();
      System.out.println("Updated backup policy: " + response.getName());
    }
  }
}
// [END netapp_v1_netapp_backuppolicy_update]
