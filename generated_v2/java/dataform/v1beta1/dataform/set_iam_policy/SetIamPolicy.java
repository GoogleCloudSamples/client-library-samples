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

package com.google.cloud.dataform.v1beta1;

// [START dataform_v1beta1_dataform_set_iam_policy]
import com.google.auth.oauth2.ComputeEngineCredentials;
import com.google.auth.oauth2.GoogleCredentials;
import com.google.auth.oauth2.ServiceAccountCredentials;
import com.google.cloud.dataform.v1beta1.DataformClient;
import com.google.cloud.dataform.v1beta1.RepositoryName;
import com.google.iam.v1.Binding;
import com.google.iam.v1.Policy;
import com.google.iam.v1.SetIamPolicyRequest;
import com.google.protobuf.FieldMask;
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

      // Read the existing policy to preserve the etag and discover an existing identity.
      Policy currentPolicy = client.getIamPolicy(resource);

      String member = null;
      for (Binding binding : currentPolicy.getBindingsList()) {
        if (binding.getMembersCount() > 0) {
          member = binding.getMembers(0);
          break;
        }
      }

      if (member == null) {
        try {
          GoogleCredentials credentials = GoogleCredentials.getApplicationDefault();
          if (credentials instanceof ServiceAccountCredentials) {
            member = "serviceAccount:" + ((ServiceAccountCredentials) credentials).getClientEmail();
          } else if (credentials instanceof ComputeEngineCredentials) {
            String account = ((ComputeEngineCredentials) credentials).getAccount();
            if (account != null && account.contains("@")) {
              member = "serviceAccount:" + account;
            }
          }
        } catch (IOException e) {
          // Fall back to the default service account if credentials cannot be inspected.
        }
      }

      if (member == null) {
        member = String.format("serviceAccount:%s@appspot.gserviceaccount.com", projectId);
      }

      Policy policy =
          Policy.newBuilder()
              .setEtag(currentPolicy.getEtag())
              .addBindings(
                  Binding.newBuilder()
                      .setRole("roles/dataform.viewer")
                      .addMembers(member)
                      .build())
              .build();

      FieldMask updateMask = FieldMask.newBuilder().addPaths("bindings").build();

      SetIamPolicyRequest request =
          SetIamPolicyRequest.newBuilder()
              .setResource(resource)
              .setPolicy(policy)
              .setUpdateMask(updateMask)
              .build();

      Policy response = client.setIamPolicy(request);
      System.out.println("Set IAM policy bindings successfully: " + response.getBindingsList());
    }
  }
}
// [END dataform_v1beta1_dataform_set_iam_policy]
