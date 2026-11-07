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

// [START networkservices_v1_networkservices_endpointpolicy_get]
import com.google.cloud.networkservices.v1.EndpointPolicy;
import com.google.cloud.networkservices.v1.EndpointPolicyName;
import com.google.cloud.networkservices.v1.NetworkServicesClient;

public class GetEndpointPolicy {

  public static void main(String[] args) throws Exception {
    String projectId = "example-project-id";
    String locationId = "global";
    String endpointPolicyId = "example-endpoint-policy-id";
    getEndpointPolicy(projectId, locationId, endpointPolicyId);
  }

  public static void getEndpointPolicy(
      String projectId, String locationId, String endpointPolicyId) throws Exception {
    // Initialize client that will be automatically closed after use.
    try (NetworkServicesClient client = NetworkServicesClient.create()) {
      String name = EndpointPolicyName.of(projectId, locationId, endpointPolicyId).toString();
      EndpointPolicy endpointPolicy = client.getEndpointPolicy(name);

      System.out.println("Retrieved Endpoint Policy: " + endpointPolicy.getName());
      System.out.println("Type: " + endpointPolicy.getType());
    }
  }
}
// [END networkservices_v1_networkservices_endpointpolicy_get]
