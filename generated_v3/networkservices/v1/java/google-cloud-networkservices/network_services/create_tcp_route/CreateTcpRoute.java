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

// [START networkservices_v1_networkservices_tcproute_create]
import com.google.cloud.networkservices.v1.NetworkServicesClient;
import com.google.cloud.networkservices.v1.TcpRoute;
import java.io.IOException;
import java.util.concurrent.ExecutionException;
import java.util.concurrent.TimeUnit;
import java.util.concurrent.TimeoutException;

public class CreateTcpRoute {

  public static void main(String[] args)
      throws IOException, ExecutionException, InterruptedException, TimeoutException {
    String projectId = "example-project-id";
    String locationId = "global";
    String tcpRouteId = "example-tcp-route";
    createTcpRoute(projectId, locationId, tcpRouteId);
  }

  public static void createTcpRoute(String projectId, String locationId, String tcpRouteId)
      throws IOException, ExecutionException, InterruptedException, TimeoutException {
    try (NetworkServicesClient client = NetworkServicesClient.create()) {
      String parent = String.format("projects/%s/locations/%s", projectId, locationId);

      TcpRoute.RouteAction routeAction =
          TcpRoute.RouteAction.newBuilder()
              .setOriginalDestination(true)
              .build();

      TcpRoute.RouteMatch routeMatch =
          TcpRoute.RouteMatch.newBuilder()
              .setAddress("0.0.0.0/0")
              .setPort("8080")
              .build();

      TcpRoute.RouteRule routeRule =
          TcpRoute.RouteRule.newBuilder()
              .setAction(routeAction)
              .addMatches(routeMatch)
              .build();

      TcpRoute tcpRoute =
          TcpRoute.newBuilder()
              .addRules(routeRule)
              .build();

      TcpRoute response =
          client.createTcpRouteAsync(parent, tcpRoute, tcpRouteId).get(3, TimeUnit.MINUTES);
      System.out.println("Created TCP Route: " + response.getName());
    }
  }
}
// [END networkservices_v1_networkservices_tcproute_create]
