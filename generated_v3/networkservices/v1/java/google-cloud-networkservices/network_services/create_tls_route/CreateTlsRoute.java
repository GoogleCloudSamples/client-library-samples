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

// [START networkservices_v1_networkservices_tlsroute_create]
import com.google.cloud.networkservices.v1.NetworkServicesClient;
import com.google.cloud.networkservices.v1.TlsRoute;
import java.io.IOException;
import java.util.concurrent.ExecutionException;
import java.util.concurrent.TimeUnit;
import java.util.concurrent.TimeoutException;

public class CreateTlsRoute {

  public static void main(String[] args) throws Exception {
    String projectId = "example-project-id";
    String locationId = "global";
    String tlsRouteId = "example-tls-route-id";
    String backendServiceId = "example-backend-service-id";
    createTlsRoute(projectId, locationId, tlsRouteId, backendServiceId);
  }

  public static void createTlsRoute(
      String projectId, String locationId, String tlsRouteId, String backendServiceId)
      throws Exception {
    try (NetworkServicesClient client = NetworkServicesClient.create()) {
      String parent = String.format("projects/%s/locations/%s", projectId, locationId);

      String serviceName =
          "global".equals(locationId)
              ? String.format(
                  "projects/%s/locations/global/backendServices/%s", projectId, backendServiceId)
              : String.format(
                  "projects/%s/regions/%s/backendServices/%s",
                  projectId, locationId, backendServiceId);

      TlsRoute.RouteMatch routeMatch =
          TlsRoute.RouteMatch.newBuilder()
              .addSniHost("example.com")
              .build();

      TlsRoute.RouteDestination routeDestination =
          TlsRoute.RouteDestination.newBuilder()
              .setServiceName(serviceName)
              .build();

      TlsRoute.RouteAction routeAction =
          TlsRoute.RouteAction.newBuilder()
              .addDestinations(routeDestination)
              .build();

      TlsRoute.RouteRule routeRule =
          TlsRoute.RouteRule.newBuilder()
              .addMatches(routeMatch)
              .setAction(routeAction)
              .build();

      TlsRoute tlsRoute =
          TlsRoute.newBuilder()
              .addRules(routeRule)
              .build();

      TlsRoute response =
          client.createTlsRouteAsync(parent, tlsRoute, tlsRouteId).get(3, TimeUnit.MINUTES);

      System.out.println("Created TLS Route: " + response.getName());
    }
  }
}
// [END networkservices_v1_networkservices_tlsroute_create]
