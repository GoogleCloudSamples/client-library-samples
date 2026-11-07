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

// [START networkservices_v1_networkservices_servicelbpolicy_delete]
import com.google.cloud.networkservices.v1.NetworkServicesClient;
import com.google.cloud.networkservices.v1.ServiceLbPolicyName;
import java.util.concurrent.TimeUnit;

public class DeleteServiceLbPolicy {

  public static void deleteServiceLbPolicy(
      String projectId, String locationId, String serviceLbPolicyId) throws Exception {
    try (NetworkServicesClient client = NetworkServicesClient.create()) {
      String name = ServiceLbPolicyName.of(projectId, locationId, serviceLbPolicyId).toString();
      client.deleteServiceLbPolicyAsync(name).get(5, TimeUnit.MINUTES);
      System.out.println("Deleted Service LB policy: " + name);
    }
  }
}
// [END networkservices_v1_networkservices_servicelbpolicy_delete]
