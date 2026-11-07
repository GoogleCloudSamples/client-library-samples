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

package com.google.cloud.networksecurity.v1beta1;

// [START networksecurity_v1beta1_networksecurity_clienttlspolicy_delete]
import com.google.cloud.networksecurity.v1beta1.ClientTlsPolicyName;
import com.google.cloud.networksecurity.v1beta1.NetworkSecurityClient;
import java.io.IOException;
import java.util.concurrent.ExecutionException;
import java.util.concurrent.TimeUnit;
import java.util.concurrent.TimeoutException;

public class DeleteClientTlsPolicy {

  public static void main(String[] args) throws Exception {
    String projectId = "example-project-id";
    String locationId = "example-location-id";
    String clientTlsPolicyId = "example-client-tls-policy-id";
    deleteClientTlsPolicy(projectId, locationId, clientTlsPolicyId);
  }

  public static void deleteClientTlsPolicy(
      String projectId, String locationId, String clientTlsPolicyId) throws Exception {
    try (NetworkSecurityClient client = NetworkSecurityClient.create()) {
      String name = ClientTlsPolicyName.of(projectId, locationId, clientTlsPolicyId).toString();
      // ClientTlsPolicy deletion is a long-running operation.
      client.deleteClientTlsPolicyAsync(name).get(5, TimeUnit.MINUTES);
      System.out.println("Deleted ClientTlsPolicy: " + name);
    }
  }
}
// [END networksecurity_v1beta1_networksecurity_clienttlspolicy_delete]
