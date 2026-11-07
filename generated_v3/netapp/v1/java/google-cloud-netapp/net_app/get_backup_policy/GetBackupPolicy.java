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

// [START netapp_v1_netapp_backuppolicy_get]
import com.google.cloud.netapp.v1.BackupPolicy;
import com.google.cloud.netapp.v1.BackupPolicyName;
import com.google.cloud.netapp.v1.NetAppClient;
import java.io.IOException;

public class GetBackupPolicy {

  public static void main(String[] args) throws Exception {
    String projectId = "example-project-id";
    String locationId = "example-location-id";
    String backupPolicyId = "example-backup-policy-id";
    getBackupPolicy(projectId, locationId, backupPolicyId);
  }

  public static void getBackupPolicy(String projectId, String locationId, String backupPolicyId)
      throws Exception {
    try (NetAppClient client = NetAppClient.create()) {
      String name = BackupPolicyName.format(projectId, locationId, backupPolicyId);

      BackupPolicy backupPolicy = client.getBackupPolicy(name);

      System.out.println("Backup policy name: " + backupPolicy.getName());
      System.out.println("State: " + backupPolicy.getState());
      System.out.println("Daily backup limit: " + backupPolicy.getDailyBackupLimit());
      System.out.println("Weekly backup limit: " + backupPolicy.getWeeklyBackupLimit());
      System.out.println("Monthly backup limit: " + backupPolicy.getMonthlyBackupLimit());
    }
  }
}
// [END netapp_v1_netapp_backuppolicy_get]
