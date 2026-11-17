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

// [START dataform_v1beta1_dataform_compute_repository_access_token_status]
import com.google.cloud.dataform.v1beta1.ComputeRepositoryAccessTokenStatusRequest;
import com.google.cloud.dataform.v1beta1.ComputeRepositoryAccessTokenStatusResponse;
import com.google.cloud.dataform.v1beta1.DataformClient;
import com.google.cloud.dataform.v1beta1.RepositoryName;
import java.io.IOException;

public class ComputeRepositoryAccessTokenStatus {

  public static void main(String[] args) throws Exception {
    String projectId = "example-project-id";
    String locationId = "us-central1";
    String repositoryId = "example-repository-id";
    computeRepositoryAccessTokenStatus(projectId, locationId, repositoryId);
  }

  public static void computeRepositoryAccessTokenStatus(
      String projectId, String locationId, String repositoryId) throws Exception {
    // Initialize client that will be used to send requests. This client only needs to be created
    // once, and can be reused for multiple requests.
    try (DataformClient client = DataformClient.create()) {
      String name = RepositoryName.of(projectId, locationId, repositoryId).toString();
      ComputeRepositoryAccessTokenStatusRequest request =
          ComputeRepositoryAccessTokenStatusRequest.newBuilder().setName(name).build();

      ComputeRepositoryAccessTokenStatusResponse response =
          client.computeRepositoryAccessTokenStatus(request);

      System.out.println("Repository access token status: " + response.getTokenStatus());
    }
  }
}
// [END dataform_v1beta1_dataform_compute_repository_access_token_status]
