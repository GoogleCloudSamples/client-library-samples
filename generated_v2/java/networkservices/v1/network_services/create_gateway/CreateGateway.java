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

// [START networkservices_v1_networkservices_gateway_create]
import com.google.cloud.networkservices.v1.Gateway;
import com.google.cloud.networkservices.v1.NetworkServicesClient;
import java.io.IOException;
import java.util.concurrent.ExecutionException;
import java.util.concurrent.TimeUnit;
import java.util.concurrent.TimeoutException;

public class CreateGateway {

  public static void main(String[] args) throws Exception {
    String projectId = "example-project-id";
    String locationId = "example-location-id";
    String gatewayId = "example-gateway-id";
    createGateway(projectId, locationId, gatewayId);
  }

  public static void createGateway(String projectId, String locationId, String gatewayId)
      throws Exception {
    try (NetworkServicesClient client = NetworkServicesClient.create()) {
      String parent = String.format("projects/%s/locations/%s", projectId, locationId);
      Gateway gateway =
          Gateway.newBuilder()
              .setType(Gateway.Type.OPEN_MESH)
              .addPorts(443)
              .setScope("example-scope")
              .build();

      // Initiate the create operation and wait for completion
      Gateway response =
          client.createGatewayAsync(parent, gateway, gatewayId).get(5, TimeUnit.MINUTES);
      System.out.println("Gateway created: " + response.getName());
    }
  }
}
// [END networkservices_v1_networkservices_gateway_create]
