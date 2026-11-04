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

package com.google.cloud.secretmanager.v1beta1;

// [START secretmanager_v1beta1_secretmanagerservice_iampolicy_get]
import com.google.cloud.secretmanager.v1beta1.SecretManagerServiceClient;
import com.google.cloud.secretmanager.v1beta1.SecretName;
import com.google.iam.v1.Binding;
import com.google.iam.v1.GetIamPolicyRequest;
import com.google.iam.v1.Policy;
import java.io.IOException;

public class GetIamPolicy {

  public static void main(String[] args) throws IOException {
    String projectId = "example-project-id";
    String secretId = "example-secret-id";
    getIamPolicy(projectId, secretId);
  }

  public static void getIamPolicy(String projectId, String secretId) throws IOException {
    try (SecretManagerServiceClient client = SecretManagerServiceClient.create()) {
      String resource = SecretName.of(projectId, secretId).toString();
      GetIamPolicyRequest request = GetIamPolicyRequest.newBuilder().setResource(resource).build();
      Policy policy = client.getIamPolicy(request);

      System.out.printf("IAM policy version: %d%n", policy.getVersion());
      for (Binding binding : policy.getBindingsList()) {
        System.out.printf("Role: %s%n", binding.getRole());
        for (String member : binding.getMembersList()) {
          System.out.printf("- %s%n", member);
        }
      }
    }
  }
}
// [END secretmanager_v1beta1_secretmanagerservice_iampolicy_get]
