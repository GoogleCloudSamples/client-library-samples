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

// [START networkservices_v1_networkservices_servicelbpolicy_create]
import com.google.cloud.networkservices.v1.NetworkServicesClient;
import com.google.cloud.networkservices.v1.ServiceLbPolicy;
import java.io.IOException;
import java.util.concurrent.ExecutionException;
import java.util.concurrent.TimeUnit;
import java.util.concurrent.TimeoutException;

public class CreateServiceLbPolicy {

  public static void main(String[] args)
      throws IOException, ExecutionException, InterruptedException, TimeoutException {
    String projectId = args[0];
    String locationId = args[1];
    String serviceLbPolicyId = args[2];
    createServiceLbPolicy(projectId, locationId, serviceLbPolicyId);
  }

  public static void createServiceLbPolicy(
      String projectId, String locationId, String serviceLbPolicyId)
      throws IOException, ExecutionException, InterruptedException, TimeoutException {
    try (NetworkServicesClient client = NetworkServicesClient.create()) {
      String parent = String.format("projects/%s/locations/%s", projectId, locationId);
      String serviceLbPolicyName =
          String.format("%s/serviceLbPolicies/%s", parent, serviceLbPolicyId);
      ServiceLbPolicy serviceLbPolicy =
          ServiceLbPolicy.newBuilder()
              .setName(serviceLbPolicyName)
              .build();

      ServiceLbPolicy response =
          client.createServiceLbPolicyAsync(parent, serviceLbPolicy, serviceLbPolicyId)
              .get(3, TimeUnit.MINUTES);

      System.out.println("Created Service LB Policy: " + response.getName());
    }
  }
}
// [END networkservices_v1_networkservices_servicelbpolicy_create]
