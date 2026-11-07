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

package com.google.cloud.dataform.v1;

// [START dataform_v1_dataform_set_iam_policy]
import com.google.cloud.dataform.v1.DataformClient;
import com.google.cloud.dataform.v1.RepositoryName;
import com.google.iam.v1.Binding;
import com.google.iam.v1.GetIamPolicyRequest;
import com.google.iam.v1.Policy;
import com.google.iam.v1.SetIamPolicyRequest;
import java.io.IOException;

public class SetIamPolicy {

  public static void main(String[] args) throws Exception {
    String projectId = "example-project-id";
    String locationId = "example-location-id";
    String repositoryId = "example-repository-id";
    setIamPolicy(projectId, locationId, repositoryId);
  }

  public static void setIamPolicy(String projectId, String locationId, String repositoryId)
      throws Exception {
    try (DataformClient client = DataformClient.create()) {
      String resource = RepositoryName.of(projectId, locationId, repositoryId).toString();

      // Retrieve the current policy to preserve the etag and prevent concurrent updates.
      GetIamPolicyRequest getIamPolicyRequest =
          GetIamPolicyRequest.newBuilder().setResource(resource).build();
      Policy existingPolicy = client.getIamPolicy(getIamPolicyRequest);

      // Create a binding to grant a role to a service account member.
      Binding binding =
          Binding.newBuilder()
              .setRole("roles/dataform.viewer")
              .addMembers(
                  "serviceAccount:example-service-account@" + projectId + ".iam.gserviceaccount.com")
              .build();

      // Update the policy by appending the new binding while keeping the existing etag intact.
      Policy policy = existingPolicy.toBuilder().addBindings(binding).build();

      SetIamPolicyRequest setIamPolicyRequest =
          SetIamPolicyRequest.newBuilder().setResource(resource).setPolicy(policy).build();

      Policy updatedPolicy = client.setIamPolicy(setIamPolicyRequest);
      System.out.println("Set IAM policy successfully for repository: " + resource);
      System.out.println("Updated policy version: " + updatedPolicy.getVersion());
    }
  }
}
// [END dataform_v1_dataform_set_iam_policy]
