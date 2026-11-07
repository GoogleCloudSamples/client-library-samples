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

package com.google.cloud.backupdr.v1beta;

// [START backupdr_v1beta_backupdr_managementservers_list]
import com.google.cloud.backupdr.v1.BackupDRClient;
import com.google.cloud.backupdr.v1.ManagementServer;
import java.io.IOException;

public class ListManagementServers {

  public static void main(String[] args) throws IOException {
    // TODO(developer): Replace these variables before running the sample.
    String projectId = "example-project-id";
    String locationId = "example-location-id";
    listManagementServers(projectId, locationId);
  }

  // Lists Backup and DR management servers in a given project and location.
  public static void listManagementServers(String projectId, String locationId) throws IOException {
    // Initialize client that will be used to send requests. This client only needs to be created
    // once, and can be reused for multiple requests.
    try (BackupDRClient client = BackupDRClient.create()) {
      String parent = String.format("projects/%s/locations/%s", projectId, locationId);

      for (ManagementServer managementServer : client.listManagementServers(parent).iterateAll()) {
        System.out.printf("Management server name: %s%n", managementServer.getName());
        System.out.printf("State: %s%n", managementServer.getState());
      }
    }
  }
}
// [END backupdr_v1beta_backupdr_managementservers_list]
