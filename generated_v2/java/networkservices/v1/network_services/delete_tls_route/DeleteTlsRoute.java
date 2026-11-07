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

// [START networkservices_v1_networkservices_tlsroute_delete]
import com.google.cloud.networkservices.v1.NetworkServicesClient;
import com.google.cloud.networkservices.v1.TlsRouteName;
import java.io.IOException;
import java.util.concurrent.ExecutionException;
import java.util.concurrent.TimeUnit;
import java.util.concurrent.TimeoutException;

public class DeleteTlsRoute {

  public static void main(String[] args) throws Exception {
    String projectId = "example-project_id";
    String locationId = "example-location_id";
    String tlsRouteId = "example-tls_route_id";
    deleteTlsRoute(projectId, locationId, tlsRouteId);
  }

  public static void deleteTlsRoute(String projectId, String locationId, String tlsRouteId)
      throws IOException, ExecutionException, InterruptedException, TimeoutException {
    try (NetworkServicesClient client = NetworkServicesClient.create()) {
      String name = TlsRouteName.of(projectId, locationId, tlsRouteId).toString();
      client.deleteTlsRouteAsync(name).get(5, TimeUnit.MINUTES);
      System.out.println("Deleted TLS route: " + name);
    }
  }
}
// [END networkservices_v1_networkservices_tlsroute_delete]
