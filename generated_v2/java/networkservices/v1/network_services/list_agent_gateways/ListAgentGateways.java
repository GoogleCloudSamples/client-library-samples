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

// [START networkservices_v1_networkservices_agentgateways_list]
import com.google.cloud.networkservices.v1.Gateway;
import com.google.cloud.networkservices.v1.ListGatewaysRequest;
import com.google.cloud.networkservices.v1.NetworkServicesClient;
import java.io.IOException;

public class ListAgentGateways {

  public static void main(String[] args) throws IOException {
    String projectId = "example-project-id";
    String locationId = "example-location-id";
    listAgentGateways(projectId, locationId);
  }

  public static void listAgentGateways(String projectId, String locationId) throws IOException {
    try (NetworkServicesClient client = NetworkServicesClient.create()) {
      String parent = String.format("projects/%s/locations/%s", projectId, locationId);

      ListGatewaysRequest request =
          ListGatewaysRequest.newBuilder()
              .setParent(parent)
              .build();

      for (Gateway gateway : client.listGateways(request).iterateAll()) {
        System.out.println("Gateway: " + gateway.getName());
      }
    }
  }
}
// [END networkservices_v1_networkservices_agentgateways_list]
