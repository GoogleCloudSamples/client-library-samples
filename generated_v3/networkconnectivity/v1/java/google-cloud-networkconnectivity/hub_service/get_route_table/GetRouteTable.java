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

// [START networkconnectivity_v1_hubservice_routetable_get]
import com.google.cloud.networkconnectivity.v1.HubServiceClient;
import com.google.cloud.networkconnectivity.v1.RouteTable;
import com.google.cloud.networkconnectivity.v1.RouteTableName;
import java.io.IOException;

public class GetRouteTable {

  public static void main(String[] args) throws IOException {
    String projectId = "example-project-id";
    String hubId = "example-hub-id";
    String routeTableId = "example-route-table-id";
    getRouteTable(projectId, hubId, routeTableId);
  }

  public static void getRouteTable(String projectId, String hubId, String routeTableId)
      throws IOException {
    try (HubServiceClient client = HubServiceClient.create()) {
      String name = RouteTableName.of(projectId, hubId, routeTableId).toString();

      RouteTable routeTable = client.getRouteTable(name);

      System.out.println("Route table: " + routeTable.getName());
      System.out.println("Route table name: " + routeTable.getName());
      System.out.println("Route table state: " + routeTable.getState());
    }
  }
}
// [END networkconnectivity_v1_hubservice_routetable_get]
