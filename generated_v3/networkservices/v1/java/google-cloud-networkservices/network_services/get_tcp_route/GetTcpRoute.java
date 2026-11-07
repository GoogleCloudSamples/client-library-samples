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

package com.google.cloud.networkservices.v1;

// [START networkservices_v1_networkservices_tcproute_get]
import com.google.cloud.networkservices.v1.GetTcpRouteRequest;
import com.google.cloud.networkservices.v1.NetworkServicesClient;
import com.google.cloud.networkservices.v1.TcpRoute;
import com.google.cloud.networkservices.v1.TcpRouteName;

public class GetTcpRoute {

  public static void main(String[] args) throws Exception {
    String projectId = "example-project_id";
    String locationId = "example-location_id";
    String tcpRouteId = "example-tcp_route_id";
    getTcpRoute(projectId, locationId, tcpRouteId);
  }

  public static void getTcpRoute(String projectId, String locationId, String tcpRouteId)
      throws Exception {
    try (NetworkServicesClient client = NetworkServicesClient.create()) {
      String name = TcpRouteName.of(projectId, locationId, tcpRouteId).toString();
      GetTcpRouteRequest request = GetTcpRouteRequest.newBuilder().setName(name).build();
      TcpRoute response = client.getTcpRoute(request);
      System.out.println("Retrieved TCP Route: " + response.getName());
    }
  }
}
// [END networkservices_v1_networkservices_tcproute_get]
