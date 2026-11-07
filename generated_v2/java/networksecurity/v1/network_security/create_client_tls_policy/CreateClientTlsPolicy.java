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

package com.google.cloud.networksecurity.v1;

// [START networksecurity_v1_networksecurity_clienttlspolicy_create]
import com.google.cloud.networksecurity.v1.ClientTlsPolicy;
import com.google.cloud.networksecurity.v1.NetworkSecurityClient;
import java.io.IOException;
import java.util.concurrent.ExecutionException;
import java.util.concurrent.TimeUnit;
import java.util.concurrent.TimeoutException;

public class CreateClientTlsPolicy {

  public static void main(String[] args) throws Exception {
    String projectId = "example-project_id";
    String locationId = "example-location_id";
    String clientTlsPolicyId = "example-client_tls_policy_id";
    createClientTlsPolicy(projectId, locationId, clientTlsPolicyId);
  }

  public static void createClientTlsPolicy(
      String projectId, String locationId, String clientTlsPolicyId) throws Exception {
    try (NetworkSecurityClient client = NetworkSecurityClient.create()) {
      String parent = String.format("projects/%s/locations/%s", projectId, locationId);
      ClientTlsPolicy clientTlsPolicy =
          ClientTlsPolicy.newBuilder()
              .setDescription("Sample Client TLS Policy")
              .build();

      // CreateClientTlsPolicy is a long-running operation; wait for it to complete.
      ClientTlsPolicy response =
          client
              .createClientTlsPolicyAsync(parent, clientTlsPolicy, clientTlsPolicyId)
              .get(5, TimeUnit.MINUTES);

      System.out.println("Client TLS Policy created: " + response.getName());
    }
  }
}
// [END networksecurity_v1_networksecurity_clienttlspolicy_create]
