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

// [START networkservices_v1_networkservices_httproute_delete]
import com.google.cloud.networkservices.v1.HttpRouteName;
import com.google.cloud.networkservices.v1.NetworkServicesClient;
import java.io.IOException;
import java.util.concurrent.ExecutionException;
import java.util.concurrent.TimeUnit;
import java.util.concurrent.TimeoutException;

public class DeleteHttpRoute {

  public static void main(String[] args) throws Exception {
    String projectId = "example-project_id";
    String locationId = "example-location_id";
    String httpRouteId = "example-http_route_id";
    deleteHttpRoute(projectId, locationId, httpRouteId);
  }

  public static void deleteHttpRoute(String projectId, String locationId, String httpRouteId)
      throws Exception {
    try (NetworkServicesClient client = NetworkServicesClient.create()) {
      String name = HttpRouteName.format(projectId, locationId, httpRouteId);

      // DeleteHttpRoute is a long-running operation; wait for completion before proceeding.
      client.deleteHttpRouteAsync(name).get(3, TimeUnit.MINUTES);

      System.out.println("Deleted HTTP route: " + name);
    }
  }
}
// [END networkservices_v1_networkservices_httproute_delete]
