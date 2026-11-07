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

package com.google.cloud.networkconnectivity.v1beta;

// [START networkconnectivity_v1beta_hubservice_routes_list]
import com.google.cloud.networkconnectivity.v1beta.HubServiceClient;
import com.google.cloud.networkconnectivity.v1beta.ListRoutesRequest;
import com.google.cloud.networkconnectivity.v1beta.Route;
import com.google.cloud.networkconnectivity.v1beta.RouteTableName;

public class ListRoutes {

  public static void main(String[] args) throws Exception {
    String projectId = "example-project_id";
    String hubId = "example-hub_id";
    String routeTableId = "example-route_table_id";
    listRoutes(projectId, hubId, routeTableId);
  }

  public static void listRoutes(String projectId, String hubId, String routeTableId)
      throws Exception {
    try (HubServiceClient client = HubServiceClient.create()) {
      String parent = RouteTableName.of(projectId, hubId, routeTableId).toString();
      ListRoutesRequest request = ListRoutesRequest.newBuilder()
          .setParent(parent)
          .build();

      for (Route route : client.listRoutes(request).iterateAll()) {
        System.out.println("Route: " + route.getName());
      }
    }
  }
}
// [END networkconnectivity_v1beta_hubservice_routes_list]
