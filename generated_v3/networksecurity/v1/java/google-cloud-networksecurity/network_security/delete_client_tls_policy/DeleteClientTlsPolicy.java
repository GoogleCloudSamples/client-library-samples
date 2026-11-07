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

// [START networksecurity_v1_networksecurity_clienttlspolicy_delete]
import com.google.cloud.networksecurity.v1.ClientTlsPolicyName;
import com.google.cloud.networksecurity.v1.NetworkSecurityClient;

import java.io.IOException;
import java.util.concurrent.ExecutionException;
import java.util.concurrent.TimeUnit;
import java.util.concurrent.TimeoutException;

public class DeleteClientTlsPolicy {

  public static void main(String[] args) throws Exception {
    String projectId = "example-project_id";
    String locationId = "example-location_id";
    String clientTlsPolicyId = "example-client_tls_policy_id";
    deleteClientTlsPolicy(projectId, locationId, clientTlsPolicyId);
  }

  public static void deleteClientTlsPolicy(
      String projectId, String locationId, String clientTlsPolicyId) throws Exception {
    try (NetworkSecurityClient client = NetworkSecurityClient.create()) {
      String name = ClientTlsPolicyName.of(projectId, locationId, clientTlsPolicyId).toString();

      // Client TLS policies must not be referenced by any backend service before deletion.
      // Wait for the long-running operation to complete.
      client.deleteClientTlsPolicyAsync(name).get(5, TimeUnit.MINUTES);
      System.out.println("Deleted client TLS policy: " + name);
    }
  }
}
// [END networksecurity_v1_networksecurity_clienttlspolicy_delete]
