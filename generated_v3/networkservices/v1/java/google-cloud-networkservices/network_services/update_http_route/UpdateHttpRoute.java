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

// [START networkservices_v1_networkservices_httproute_update]
import com.google.cloud.networkservices.v1.HttpRoute;
import com.google.cloud.networkservices.v1.HttpRouteName;
import com.google.cloud.networkservices.v1.NetworkServicesClient;
import com.google.protobuf.FieldMask;
import java.io.IOException;
import java.util.concurrent.ExecutionException;
import java.util.concurrent.TimeUnit;
import java.util.concurrent.TimeoutException;

public class UpdateHttpRoute {

  public static void main(String[] args)
      throws IOException, ExecutionException, InterruptedException, TimeoutException {
    String projectId = "example-project-id";
    String locationId = "global";
    String httpRouteId = "example-http-route-id";
    updateHttpRoute(projectId, locationId, httpRouteId);
  }

  public static void updateHttpRoute(String projectId, String locationId, String httpRouteId)
      throws IOException, ExecutionException, InterruptedException, TimeoutException {
    // Initialize client that will be closed after use.
    try (NetworkServicesClient client = NetworkServicesClient.create()) {
      HttpRoute httpRoute =
          HttpRoute.newBuilder()
              .setName(HttpRouteName.of(projectId, locationId, httpRouteId).toString())
              .setDescription("Updated description for HTTP route")
              .addHostnames("example.com")
              .build();
      FieldMask updateMask = FieldMask.newBuilder().addPaths("description").build();

      // Wait for the long-running operation to complete.
      HttpRoute response =
          client.updateHttpRouteAsync(httpRoute, updateMask).get(3, TimeUnit.MINUTES);

      System.out.println("Updated HTTP route: " + response.getName());
      System.out.println("Description: " + response.getDescription());
    }
  }
}
// [END networkservices_v1_networkservices_httproute_update]
