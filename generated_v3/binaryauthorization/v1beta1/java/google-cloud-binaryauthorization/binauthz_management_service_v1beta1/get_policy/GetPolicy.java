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

// [START binaryauthorization_v1beta1_binauthzmanagementservicev1beta1_policy_get]
import com.google.cloud.binaryauthorization.v1beta1.BinauthzManagementServiceV1Beta1Client;
import com.google.cloud.binaryauthorization.v1beta1.Policy;
import java.io.IOException;

public class GetPolicy {

  public static void main(String[] args) throws Exception {
    String projectId = "example-project-id";
    getPolicy(projectId);
  }

  public static void getPolicy(String projectId) throws Exception {
    // Initialize the client that will be used to send requests.
    // This client only needs to be created once, and can be reused for multiple requests.
    try (BinauthzManagementServiceV1Beta1Client client =
        BinauthzManagementServiceV1Beta1Client.create()) {
      String name = "projects/" + projectId + "/policy";

      Policy policy = client.getPolicy(name);

      System.out.println("Retrieved policy: " + policy.getName());
      System.out.println(
          "Default admission rule evaluation mode: "
              + policy.getDefaultAdmissionRule().getEvaluationMode());
    }
  }
}
// [END binaryauthorization_v1beta1_binauthzmanagementservicev1beta1_policy_get]
