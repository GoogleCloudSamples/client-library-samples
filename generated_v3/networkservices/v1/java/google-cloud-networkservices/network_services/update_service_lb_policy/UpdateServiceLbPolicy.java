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

// [START networkservices_v1_networkservices_servicelbpolicy_update]
import com.google.cloud.networkservices.v1.NetworkServicesClient;
import com.google.cloud.networkservices.v1.ServiceLbPolicy;
import com.google.protobuf.FieldMask;
import java.io.IOException;
import java.util.concurrent.ExecutionException;
import java.util.concurrent.TimeUnit;
import java.util.concurrent.TimeoutException;

public class UpdateServiceLbPolicy {

  public static void main(String[] args) throws Exception {
    String projectId = "example-project_id";
    String locationId = "example-location_id";
    String serviceLbPolicyId = "example-service_lb_policy_id";
    updateServiceLbPolicy(projectId, locationId, serviceLbPolicyId);
  }

  public static void updateServiceLbPolicy(
      String projectId, String locationId, String serviceLbPolicyId) throws Exception {
    try (NetworkServicesClient client = NetworkServicesClient.create()) {
      ServiceLbPolicy serviceLbPolicy =
          ServiceLbPolicy.newBuilder()
              .setName(
                  String.format(
                      "projects/%s/locations/%s/serviceLbPolicies/%s",
                      projectId, locationId, serviceLbPolicyId))
              .setDescription("Updated service LB policy description")
              .build();
      FieldMask updateMask = FieldMask.newBuilder().addPaths("description").build();

      ServiceLbPolicy response =
          client.updateServiceLbPolicyAsync(serviceLbPolicy, updateMask).get(3, TimeUnit.MINUTES);

      System.out.println("Updated service LB policy: " + response.getName());
    }
  }
}
// [END networkservices_v1_networkservices_servicelbpolicy_update]
