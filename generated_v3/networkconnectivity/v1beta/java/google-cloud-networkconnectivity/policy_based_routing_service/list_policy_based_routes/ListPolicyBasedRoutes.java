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

// [START networkconnectivity_v1beta_policybasedroutingservice_policybasedroutes_list]
import com.google.cloud.networkconnectivity.v1beta.LocationName;
import com.google.cloud.networkconnectivity.v1beta.PolicyBasedRoute;
import com.google.cloud.networkconnectivity.v1beta.PolicyBasedRoutingServiceClient;
import java.io.IOException;

public class ListPolicyBasedRoutes {

  public static void main(String[] args) throws Exception {
    String projectId = "example-project-id";
    listPolicyBasedRoutes(projectId);
  }

  public static void listPolicyBasedRoutes(String projectId) throws Exception {
    // Initialize the client that manages policy-based routing service requests
    try (PolicyBasedRoutingServiceClient client = PolicyBasedRoutingServiceClient.create()) {
      String parent = LocationName.of(projectId, "global").toString();

      // Retrieve and print all policy-based routes in the specified project
      for (PolicyBasedRoute route : client.listPolicyBasedRoutes(parent).iterateAll()) {
        System.out.println("Policy-based route: " + route.getName());
        System.out.println("Network: " + route.getNetwork());
        System.out.println("Priority: " + route.getPriority());
      }
    }
  }
}
// [END networkconnectivity_v1beta_policybasedroutingservice_policybasedroutes_list]
