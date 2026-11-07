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

// [START networkconnectivity_v1_policybasedroutingservice_policybasedroute_create]
import com.google.cloud.networkconnectivity.v1.PolicyBasedRoute;
import com.google.cloud.networkconnectivity.v1.PolicyBasedRoutingServiceClient;
import java.io.IOException;
import java.util.concurrent.ExecutionException;
import java.util.concurrent.TimeUnit;
import java.util.concurrent.TimeoutException;

public class CreatePolicyBasedRoute {

  public static void main(String[] args) throws Exception {
    String policyBasedRouteId = "example-policy_based_route_id";
    String projectId = "example-project_id";
    String networkId = "example-network_id";
    createPolicyBasedRoute(policyBasedRouteId, projectId, networkId);
  }

  public static void createPolicyBasedRoute(
      String policyBasedRouteId, String projectId, String networkId) throws Exception {
    try (PolicyBasedRoutingServiceClient client = PolicyBasedRoutingServiceClient.create()) {
      String parent = String.format("projects/%s/locations/global", projectId);
      PolicyBasedRoute policyBasedRoute =
          PolicyBasedRoute.newBuilder()
              .setNetwork(String.format("projects/%s/global/networks/%s", projectId, networkId))
              .setFilter(
                  PolicyBasedRoute.Filter.newBuilder()
                      .setProtocolVersion(PolicyBasedRoute.Filter.ProtocolVersion.IPV4)
                      .build())
              .setNextHopIlbIp("10.0.0.100")
              .build();

      PolicyBasedRoute response =
          client
              .createPolicyBasedRouteAsync(parent, policyBasedRoute, policyBasedRouteId)
              .get(5, TimeUnit.MINUTES);

      System.out.println("Created policy-based route: " + response.getName());
    }
  }
}
// [END networkconnectivity_v1_policybasedroutingservice_policybasedroute_create]
