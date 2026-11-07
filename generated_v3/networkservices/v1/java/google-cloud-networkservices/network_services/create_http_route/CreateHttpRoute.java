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

// [START networkservices_v1_networkservices_httproute_create]
import com.google.cloud.networkservices.v1.HttpRoute;
import com.google.cloud.networkservices.v1.NetworkServicesClient;
import java.util.concurrent.TimeUnit;

public class CreateHttpRoute {

  public static void main(String[] args) throws Exception {
    String projectId = "example-project-id";
    String locationId = "global";
    String httpRouteId = "example-http-route-id";
    createHttpRoute(projectId, locationId, httpRouteId);
  }

  public static void createHttpRoute(String projectId, String locationId, String httpRouteId)
      throws Exception {
    try (NetworkServicesClient client = NetworkServicesClient.create()) {
      String parent = String.format("projects/%s/locations/%s", projectId, locationId);

      HttpRoute.RouteMatch routeMatch =
          HttpRoute.RouteMatch.newBuilder()
              .setPrefixMatch("/")
              .build();

      HttpRoute.Redirect redirect =
          HttpRoute.Redirect.newBuilder()
              .setHostRedirect("example.com")
              .build();

      HttpRoute.RouteAction routeAction =
          HttpRoute.RouteAction.newBuilder()
              .setRedirect(redirect)
              .build();

      HttpRoute.RouteRule routeRule =
          HttpRoute.RouteRule.newBuilder()
              .addMatches(routeMatch)
              .setAction(routeAction)
              .build();

      HttpRoute httpRoute =
          HttpRoute.newBuilder()
              .addHostnames("example.com")
              .addRules(routeRule)
              .build();

      // Initialize the route creation operation and wait for completion.
      HttpRoute response =
          client.createHttpRouteAsync(parent, httpRoute, httpRouteId).get(3, TimeUnit.MINUTES);

      System.out.println("Created HttpRoute: " + response.getName());
    }
  }
}
// [END networkservices_v1_networkservices_httproute_create]
