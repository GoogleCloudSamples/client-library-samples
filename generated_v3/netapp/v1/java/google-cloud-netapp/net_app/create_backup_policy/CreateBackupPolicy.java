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

// [START netapp_v1_netapp_backuppolicy_create]
import com.google.cloud.netapp.v1.BackupPolicy;
import com.google.cloud.netapp.v1.CreateBackupPolicyRequest;
import com.google.cloud.netapp.v1.LocationName;
import com.google.cloud.netapp.v1.NetAppClient;
import java.io.IOException;
import java.util.concurrent.ExecutionException;

public class CreateBackupPolicy {

  public static void main(String[] args) throws Exception {
    String projectId = "example-project_id";
    String locationId = "example-location_id";
    String backupPolicyId = "example-backup_policy_id";
    createBackupPolicy(projectId, locationId, backupPolicyId);
  }

  public static void createBackupPolicy(
      String projectId, String locationId, String backupPolicyId) throws Exception {
    try (NetAppClient client = NetAppClient.create()) {
      String parent = LocationName.of(projectId, locationId).toString();
      BackupPolicy backupPolicy =
          BackupPolicy.newBuilder()
              .setDailyBackupLimit(2)
              .build();

      CreateBackupPolicyRequest request =
          CreateBackupPolicyRequest.newBuilder()
              .setParent(parent)
              .setBackupPolicyId(backupPolicyId)
              .setBackupPolicy(backupPolicy)
              .build();

      BackupPolicy response = client.createBackupPolicyAsync(request).get();
      System.out.println("Created backup policy: " + response.getName());
    }
  }
}
// [END netapp_v1_netapp_backuppolicy_create]
