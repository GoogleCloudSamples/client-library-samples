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

// [START networkconnectivity_v1_crossnetworkautomationservice_serviceconnectiontoken_create]
import com.google.cloud.networkconnectivity.v1.CrossNetworkAutomationServiceClient;
import com.google.cloud.networkconnectivity.v1.ServiceConnectionToken;
import java.io.IOException;
import java.util.concurrent.ExecutionException;

public class CreateServiceConnectionToken {

  public static void main(String[] args) throws Exception {
    String projectId = "example-project_id";
    String locationId = "example-location_id";
    String serviceConnectionTokenId = "example-service_connection_token_id";
    String networkId = "example-network_id";
    createServiceConnectionToken(projectId, locationId, serviceConnectionTokenId, networkId);
  }

  public static void createServiceConnectionToken(
      String projectId, String locationId, String serviceConnectionTokenId, String networkId)
      throws Exception {
    // Initialize client that will be closed when the block terminates.
    try (CrossNetworkAutomationServiceClient client =
        CrossNetworkAutomationServiceClient.create()) {
      String parent = String.format("projects/%s/locations/%s", projectId, locationId);
      ServiceConnectionToken serviceConnectionToken =
          ServiceConnectionToken.newBuilder()
              .setNetwork(String.format("projects/%s/global/networks/%s", projectId, networkId))
              .setDescription("Sample service connection token")
              .build();

      // Initiate the long-running operation and wait for its completion.
      ServiceConnectionToken response =
          client
              .createServiceConnectionTokenAsync(
                  parent, serviceConnectionToken, serviceConnectionTokenId)
              .get();

      System.out.println("Created service connection token: " + response.getName());
    }
  }
}
// [END networkconnectivity_v1_crossnetworkautomationservice_serviceconnectiontoken_create]
