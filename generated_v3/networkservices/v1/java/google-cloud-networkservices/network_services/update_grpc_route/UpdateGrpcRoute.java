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

// [START networkservices_v1_networkservices_grpcroute_update]
import com.google.cloud.networkservices.v1.GrpcRoute;
import com.google.cloud.networkservices.v1.NetworkServicesClient;
import com.google.protobuf.FieldMask;
import java.io.IOException;
import java.util.concurrent.ExecutionException;
import java.util.concurrent.TimeUnit;
import java.util.concurrent.TimeoutException;

public class UpdateGrpcRoute {

  public static void main(String[] args) throws Exception {
    String projectId = "example-project-id";
    String locationId = "global";
    String grpcRouteId = "example-grpc-route-id";
    updateGrpcRoute(projectId, locationId, grpcRouteId);
  }

  public static void updateGrpcRoute(String projectId, String locationId, String grpcRouteId)
      throws IOException, ExecutionException, InterruptedException, TimeoutException {
    try (NetworkServicesClient client = NetworkServicesClient.create()) {
      String routePath =
          String.format(
              "projects/%s/locations/%s/grpcRoutes/%s", projectId, locationId, grpcRouteId);

      // Fetch the existing GrpcRoute to preserve required configuration fields such as rules
      GrpcRoute grpcRoute =
          client.getGrpcRoute(routePath).toBuilder()
              .setName(routePath)
              .setDescription("Updated description for GrpcRoute")
              .build();

      FieldMask updateMask = FieldMask.newBuilder().addPaths("description").build();

      // Wait for the long-running operation to complete before accessing the result
      GrpcRoute response =
          client.updateGrpcRouteAsync(grpcRoute, updateMask).get(3, TimeUnit.MINUTES);

      System.out.println("Updated GrpcRoute: " + response.getName());
      System.out.println("Description: " + response.getDescription());
    }
  }
}
// [END networkservices_v1_networkservices_grpcroute_update]
