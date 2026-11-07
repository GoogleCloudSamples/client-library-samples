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

package com.google.cloud.networkconnectivity.v1;

// [START networkconnectivity_v1_hubservice_routetables_list]
import com.google.cloud.networkconnectivity.v1.HubName;
import com.google.cloud.networkconnectivity.v1.HubServiceClient;
import com.google.cloud.networkconnectivity.v1.RouteTable;

public class ListRouteTables {

  public static void main(String[] args) throws Exception {
    String projectId = "example-project_id";
    String hubId = "example-hub_id";
    listRouteTables(projectId, hubId);
  }

  public static void listRouteTables(String projectId, String hubId) throws Exception {
    try (HubServiceClient client = HubServiceClient.create()) {
      String parent = HubName.of(projectId, hubId).toString();
      for (RouteTable routeTable : client.listRouteTables(parent).iterateAll()) {
        System.out.println("Route table: " + routeTable.getName());
      }
    }
  }
}
// [END networkconnectivity_v1_hubservice_routetables_list]
