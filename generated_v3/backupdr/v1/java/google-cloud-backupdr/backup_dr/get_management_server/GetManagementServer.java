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

// [START backupdr_v1_backupdr_managementserver_get]
import com.google.cloud.backupdr.v1.BackupDRClient;
import com.google.cloud.backupdr.v1.ManagementServer;
import com.google.cloud.backupdr.v1.ManagementServerName;

public class GetManagementServer {

  public static void main(String[] args) throws Exception {
    String projectId = "example-project-id";
    String locationId = "example-location-id";
    String managementServerId = "example-management-server-id";
    getManagementServer(projectId, locationId, managementServerId);
  }

  public static void getManagementServer(
      String projectId, String locationId, String managementServerId) throws Exception {
    try (BackupDRClient client = BackupDRClient.create()) {
      String name =
          ManagementServerName.of(projectId, locationId, managementServerId).toString();

      ManagementServer response = client.getManagementServer(name);

      System.out.println("Retrieved Management Server: " + response.getName());
      System.out.println("State: " + response.getState());
    }
  }
}
// [END backupdr_v1_backupdr_managementserver_get]
