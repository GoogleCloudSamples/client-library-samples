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

package com.google.cloud.orgpolicy.v2;

// [START orgpolicy_v2_orgpolicy_effectivepolicy_get]
import com.google.cloud.orgpolicy.v2.GetEffectivePolicyRequest;
import com.google.cloud.orgpolicy.v2.OrgPolicyClient;
import com.google.cloud.orgpolicy.v2.Policy;
import java.io.IOException;

public class GetEffectivePolicy {

  public static void main(String[] args) throws Exception {
    String projectId = "example-project-id";
    String policyId = "compute.disableSerialPortAccess";
    getEffectivePolicy(projectId, policyId);
  }

  public static void getEffectivePolicy(String projectId, String policyId) throws Exception {
    // Initialize client that will be closed when the try-with-resources block finishes.
    try (OrgPolicyClient client = OrgPolicyClient.create()) {
      String name = String.format("projects/%s/policies/%s", projectId, policyId);

      GetEffectivePolicyRequest request =
          GetEffectivePolicyRequest.newBuilder()
              .setName(name)
              .build();

      Policy policy = client.getEffectivePolicy(request);

      System.out.println("Retrieved effective policy: " + policy.getName());
      System.out.println("Policy spec: " + policy.getSpec());
    }
  }
}
// [END orgpolicy_v2_orgpolicy_effectivepolicy_get]
