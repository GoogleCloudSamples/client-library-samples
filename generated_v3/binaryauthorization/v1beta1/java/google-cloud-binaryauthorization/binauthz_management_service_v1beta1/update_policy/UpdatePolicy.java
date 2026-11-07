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

package com.google.cloud.binaryauthorization.v1beta1;

// [START binaryauthorization_v1beta1_binauthzmanagementservicev1beta1_policy_update]
import com.google.cloud.binaryauthorization.v1beta1.AdmissionRule;
import com.google.cloud.binaryauthorization.v1beta1.BinauthzManagementServiceV1Beta1Client;
import com.google.cloud.binaryauthorization.v1beta1.Policy;
import com.google.cloud.binaryauthorization.v1beta1.PolicyName;
import java.io.IOException;

public class UpdatePolicy {

  // Updates the Binary Authorization policy for the project.
  public static void updatePolicy(String projectId) throws IOException {
    try (BinauthzManagementServiceV1Beta1Client client =
        BinauthzManagementServiceV1Beta1Client.create()) {
      Policy policy =
          Policy.newBuilder()
              .setName(PolicyName.of(projectId).toString())
              .setDescription("Policy update")
              .setDefaultAdmissionRule(
                  AdmissionRule.newBuilder()
                      .setEvaluationMode(AdmissionRule.EvaluationMode.ALWAYS_ALLOW)
                      .setEnforcementMode(AdmissionRule.EnforcementMode.ENFORCED_BLOCK_AND_AUDIT_LOG)
                      .build())
              .build();

      Policy response = client.updatePolicy(policy);
      System.out.println("Updated policy: " + response.getName());
    }
  }
}
// [END binaryauthorization_v1beta1_binauthzmanagementservicev1beta1_policy_update]
