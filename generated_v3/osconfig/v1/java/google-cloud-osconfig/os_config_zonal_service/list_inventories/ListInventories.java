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

package com.google.cloud.osconfig.v1;

// [START osconfig_v1_osconfigzonalservice_inventories_list]
import com.google.cloud.osconfig.v1.Inventory;
import com.google.cloud.osconfig.v1.ListInventoriesRequest;
import com.google.cloud.osconfig.v1.OsConfigZonalServiceClient;

public class ListInventories {

  public static void main(String[] args) throws Exception {
    String projectId = args[0];
    listInventories(projectId);
  }

  public static void listInventories(String projectId) throws Exception {
    try (OsConfigZonalServiceClient client = OsConfigZonalServiceClient.create()) {
      String location = "us-central1-a";
      // Use "-" as the instance ID to list inventories for all VM instances in the location.
      String instanceId = "-";
      String parent =
          String.format("projects/%s/locations/%s/instances/%s", projectId, location, instanceId);

      ListInventoriesRequest request =
          ListInventoriesRequest.newBuilder()
              .setParent(parent)
              .build();

      for (Inventory inventory : client.listInventories(request).iterateAll()) {
        System.out.println("Inventory: " + inventory.getName());
        System.out.println("Operating system: " + inventory.getOsInfo().getLongName());
      }
    }
  }
}
// [END osconfig_v1_osconfigzonalservice_inventories_list]
