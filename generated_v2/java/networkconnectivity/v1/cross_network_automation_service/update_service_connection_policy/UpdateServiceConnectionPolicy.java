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

// [START networkconnectivity_v1_crossnetworkautomationservice_serviceconnectionpolicy_update]
import com.google.cloud.networkconnectivity.v1.CrossNetworkAutomationServiceClient;
import com.google.cloud.networkconnectivity.v1.ServiceConnectionPolicy;
import com.google.cloud.networkconnectivity.v1.ServiceConnectionPolicyName;
import com.google.protobuf.FieldMask;
import java.io.IOException;
import java.util.concurrent.ExecutionException;
import java.util.concurrent.TimeUnit;
import java.util.concurrent.TimeoutException;

public class UpdateServiceConnectionPolicy {

  public static void main(String[] args) throws Exception {
    String projectId = "example-project-id";
    String locationId = "us-central1";
    String serviceConnectionPolicyId = "example-service-connection-policy-id";
    updateServiceConnectionPolicy(projectId, locationId, serviceConnectionPolicyId);
  }

  public static void updateServiceConnectionPolicy(
      String projectId, String locationId, String serviceConnectionPolicyId) throws Exception {
    // Initialize client that will be closed automatically after use.
    try (CrossNetworkAutomationServiceClient client =
        CrossNetworkAutomationServiceClient.create()) {
      ServiceConnectionPolicy serviceConnectionPolicy =
          ServiceConnectionPolicy.newBuilder()
              .setName(
                  ServiceConnectionPolicyName.of(
                          projectId, locationId, serviceConnectionPolicyId)
                      .toString())
              .setDescription("Updated service connection policy description")
              .build();

      FieldMask updateMask = FieldMask.newBuilder().addPaths("description").build();

      // Initiate the long-running operation and wait for its completion.
      ServiceConnectionPolicy response =
          client
              .updateServiceConnectionPolicyAsync(serviceConnectionPolicy, updateMask)
              .get(5, TimeUnit.MINUTES);

      System.out.printf("Updated service connection policy: %s%n", response.getName());
    }
  }
}
// [END networkconnectivity_v1_crossnetworkautomationservice_serviceconnectionpolicy_update]
