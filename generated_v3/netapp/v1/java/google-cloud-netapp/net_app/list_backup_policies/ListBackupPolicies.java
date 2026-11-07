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

// [START netapp_v1_netapp_backuppolicies_list]
import com.google.cloud.netapp.v1.BackupPolicy;
import com.google.cloud.netapp.v1.LocationName;
import com.google.cloud.netapp.v1.NetAppClient;
import java.io.IOException;

public class ListBackupPolicies {

  public static void main(String[] args) throws Exception {
    String projectId = "example-project-id";
    String locationId = "example-location-id";
    listBackupPolicies(projectId, locationId);
  }

  public static void listBackupPolicies(String projectId, String locationId) throws IOException {
    try (NetAppClient client = NetAppClient.create()) {
      String parent = LocationName.of(projectId, locationId).toString();
      for (BackupPolicy backupPolicy : client.listBackupPolicies(parent).iterateAll()) {
        System.out.println("Backup policy: " + backupPolicy.getName());
      }
    }
  }
}
// [END netapp_v1_netapp_backuppolicies_list]
