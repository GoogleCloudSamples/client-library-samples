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

// [START networkservices_v1_networkservices_servicelbpolicy_get]
import com.google.cloud.networkservices.v1.NetworkServicesClient;
import com.google.cloud.networkservices.v1.ServiceLbPolicy;
import com.google.cloud.networkservices.v1.ServiceLbPolicyName;

public class GetServiceLbPolicy {

  public static void main(String[] args) throws Exception {
    String projectId = "example-project_id";
    String locationId = "example-location_id";
    String serviceLbPolicyId = "example-service_lb_policy_id";
    getServiceLbPolicy(projectId, locationId, serviceLbPolicyId);
  }

  public static void getServiceLbPolicy(
      String projectId, String locationId, String serviceLbPolicyId) throws Exception {
    // Initialize client that will be used to send requests.
    // Client instances manage service connections and should be closed when complete.
    try (NetworkServicesClient client = NetworkServicesClient.create()) {
      String name = ServiceLbPolicyName.of(projectId, locationId, serviceLbPolicyId).toString();

      ServiceLbPolicy response = client.getServiceLbPolicy(name);
      System.out.println("Retrieved Service LB Policy: " + response.getName());
    }
  }
}
// [END networkservices_v1_networkservices_servicelbpolicy_get]
