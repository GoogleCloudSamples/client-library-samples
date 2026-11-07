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

// [START networkservices_v1_networkservices_endpointpolicy_delete]
import com.google.cloud.networkservices.v1.NetworkServicesClient;
import java.io.IOException;
import java.util.concurrent.ExecutionException;
import java.util.concurrent.TimeUnit;
import java.util.concurrent.TimeoutException;

public class DeleteEndpointPolicy {

  public static void main(String[] args) throws Exception {
    String projectId = "example-project_id";
    String locationId = "example-location_id";
    String endpointPolicyId = "example-endpoint_policy_id";
    deleteEndpointPolicy(projectId, locationId, endpointPolicyId);
  }

  public static void deleteEndpointPolicy(
      String projectId, String locationId, String endpointPolicyId) throws Exception {
    // Initialize client that will be automatically closed after use.
    try (NetworkServicesClient client = NetworkServicesClient.create()) {
      String name = EndpointPolicyName.of(projectId, locationId, endpointPolicyId).toString();

      // Deletes the endpoint policy asynchronously and waits for the operation to complete.
      client.deleteEndpointPolicyAsync(name).get(5, TimeUnit.MINUTES);
      System.out.println("Endpoint policy deleted: " + name);
    }
  }
}
// [END networkservices_v1_networkservices_endpointpolicy_delete]
