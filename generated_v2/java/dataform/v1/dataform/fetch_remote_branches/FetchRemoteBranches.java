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

// [START dataform_v1_dataform_fetch_remote_branches]
import com.google.cloud.dataform.v1.DataformClient;
import com.google.cloud.dataform.v1.FetchRemoteBranchesRequest;
import com.google.cloud.dataform.v1.FetchRemoteBranchesResponse;
import com.google.cloud.dataform.v1.RepositoryName;
import java.io.IOException;

public class FetchRemoteBranches {

  public static void main(String[] args) throws Exception {
    String projectId = "example-project_id";
    String locationId = "example-location_id";
    String repositoryId = "example-repository_id";
    fetchRemoteBranches(projectId, locationId, repositoryId);
  }

  public static void fetchRemoteBranches(
      String projectId, String locationId, String repositoryId) throws Exception {
    // Initialize client within a try-with-resources block to handle resource cleanup
    try (DataformClient client = DataformClient.create()) {
      String name = RepositoryName.of(projectId, locationId, repositoryId).toString();
      FetchRemoteBranchesRequest request =
          FetchRemoteBranchesRequest.newBuilder().setName(name).build();

      FetchRemoteBranchesResponse response = client.fetchRemoteBranches(request);

      System.out.println("Fetched remote branches:");
      for (String branch : response.getBranchesList()) {
        System.out.println(branch);
      }
    }
  }
}
// [END dataform_v1_dataform_fetch_remote_branches]
