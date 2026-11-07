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

package com.google.cloud.cloudasset.v1;

// [START cloudasset_v1_assetservice_batch_get_effective_iam_policies]
import com.google.cloud.asset.v1.AssetServiceClient;
import com.google.cloud.asset.v1.BatchGetEffectiveIamPoliciesRequest;
import com.google.cloud.asset.v1.BatchGetEffectiveIamPoliciesResponse;

public class BatchGetEffectiveIamPolicies {

  public static void main(String[] args) throws Exception {
    // The full resource name residing on or under the specified scope.
    String names = "//cloudresourcemanager.googleapis.com/projects/example-project-id";
    // The resource hierarchy ancestor to evaluate against (projects/{project_id}, folders/{folder_id}, organizations/{org_id}).
    String scope = "projects/example-project-id";
    batchGetEffectiveIamPolicies(names, scope);
  }

  public static void batchGetEffectiveIamPolicies(String names, String scope) throws Exception {
    try (AssetServiceClient client = AssetServiceClient.create()) {
      BatchGetEffectiveIamPoliciesRequest request =
          BatchGetEffectiveIamPoliciesRequest.newBuilder()
              .setScope(scope)
              .addNames(names)
              .build();

      BatchGetEffectiveIamPoliciesResponse response = client.batchGetEffectiveIamPolicies(request);
      for (BatchGetEffectiveIamPoliciesResponse.EffectiveIamPolicy policyResult :
          response.getPolicyResultsList()) {
        System.out.printf("Full resource name: %s%n", policyResult.getFullResourceName());
        for (BatchGetEffectiveIamPoliciesResponse.EffectiveIamPolicy.PolicyInfo policyInfo :
            policyResult.getPoliciesList()) {
          System.out.printf("Attached resource: %s%n", policyInfo.getAttachedResource());
          System.out.printf("Policy: %s%n", policyInfo.getPolicy());
        }
      }
    }
  }
}
// [END cloudasset_v1_assetservice_batch_get_effective_iam_policies]
