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

// [START networkconnectivity_v1_crossnetworkautomationservice_serviceconnectiontoken_delete]
import com.google.cloud.networkconnectivity.v1.CrossNetworkAutomationServiceClient;
import com.google.cloud.networkconnectivity.v1.ServiceConnectionTokenName;
import java.io.IOException;
import java.util.concurrent.ExecutionException;
import java.util.concurrent.TimeUnit;
import java.util.concurrent.TimeoutException;

public class DeleteServiceConnectionToken {

  public static void main(String[] args) throws Exception {
    String projectId = "example-project_id";
    String locationId = "example-location_id";
    String serviceConnectionTokenId = "example-service_connection_token_id";
    deleteServiceConnectionToken(projectId, locationId, serviceConnectionTokenId);
  }

  public static void deleteServiceConnectionToken(
      String projectId, String locationId, String serviceConnectionTokenId) throws Exception {
    try (CrossNetworkAutomationServiceClient client = CrossNetworkAutomationServiceClient.create()) {
      String name =
          ServiceConnectionTokenName.of(projectId, locationId, serviceConnectionTokenId).toString();
      // Block until the long-running operation completes.
      client.deleteServiceConnectionTokenAsync(name).get(5, TimeUnit.MINUTES);
      System.out.println("Service connection token deleted: " + name);
    }
  }
}
// [END networkconnectivity_v1_crossnetworkautomationservice_serviceconnectiontoken_delete]
