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

// [START networksecurity_v1_networksecurity_clienttlspolicy_get]
import com.google.cloud.networksecurity.v1.ClientTlsPolicy;
import com.google.cloud.networksecurity.v1.ClientTlsPolicyName;
import com.google.cloud.networksecurity.v1.NetworkSecurityClient;
import java.io.IOException;

public class GetClientTlsPolicy {

  public static void main(String[] args) throws Exception {
    String projectId = "example-project_id";
    String locationId = "example-location_id";
    String clientTlsPolicyId = "example-client_tls_policy_id";
    getClientTlsPolicy(projectId, locationId, clientTlsPolicyId);
  }

  public static void getClientTlsPolicy(
      String projectId, String locationId, String clientTlsPolicyId) throws Exception {
    // Initialize the client that will be used to send requests.
    // This client only needs to be created once, and can be reused for multiple requests.
    try (NetworkSecurityClient client = NetworkSecurityClient.create()) {
      String name = ClientTlsPolicyName.of(projectId, locationId, clientTlsPolicyId).toString();

      ClientTlsPolicy clientTlsPolicy = client.getClientTlsPolicy(name);
      System.out.println("Retrieved Client TLS Policy: " + clientTlsPolicy.getName());
    }
  }
}
// [END networksecurity_v1_networksecurity_clienttlspolicy_get]
