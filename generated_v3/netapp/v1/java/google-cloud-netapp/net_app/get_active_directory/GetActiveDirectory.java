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

// [START netapp_v1_netapp_activedirectory_get]
import com.google.cloud.netapp.v1.ActiveDirectory;
import com.google.cloud.netapp.v1.ActiveDirectoryName;
import com.google.cloud.netapp.v1.NetAppClient;

public class GetActiveDirectory {

  public static void main(String[] args) throws Exception {
    String projectId = "example-project-id";
    String locationId = "example-location-id";
    String activeDirectoryId = "example-active-directory-id";
    getActiveDirectory(projectId, locationId, activeDirectoryId);
  }

  public static void getActiveDirectory(
      String projectId, String locationId, String activeDirectoryId) throws Exception {
    try (NetAppClient client = NetAppClient.create()) {
      String name = ActiveDirectoryName.of(projectId, locationId, activeDirectoryId).toString();
      ActiveDirectory response = client.getActiveDirectory(name);

      System.out.println("Active Directory retrieved: " + response.getName());
      System.out.println("Domain: " + response.getDomain());
      System.out.println("State: " + response.getState());
    }
  }
}
// [END netapp_v1_netapp_activedirectory_get]
