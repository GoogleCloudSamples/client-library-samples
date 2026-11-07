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

// [START dataform_v1beta1_dataform_fetch_git_ahead_behind]
import com.google.cloud.dataform.v1beta1.DataformClient;
import com.google.cloud.dataform.v1beta1.FetchGitAheadBehindRequest;
import com.google.cloud.dataform.v1beta1.FetchGitAheadBehindResponse;
import com.google.cloud.dataform.v1beta1.WorkspaceName;

public class FetchGitAheadBehind {

  public static void main(String[] args) throws Exception {
    String projectId = "example-project_id";
    String locationId = "example-location_id";
    String repositoryId = "example-repository_id";
    String workspaceId = "example-workspace_id";
    String remoteBranch = "example-remote_branch";
    fetchGitAheadBehind(projectId, locationId, repositoryId, workspaceId, remoteBranch);
  }

  public static void fetchGitAheadBehind(
      String projectId,
      String locationId,
      String repositoryId,
      String workspaceId,
      String remoteBranch)
      throws Exception {
    // Initialize the Dataform client using Application Default Credentials.
    try (DataformClient client = DataformClient.create()) {
      String name =
          WorkspaceName.of(projectId, locationId, repositoryId, workspaceId).toString();
      FetchGitAheadBehindRequest request =
          FetchGitAheadBehindRequest.newBuilder()
              .setName(name)
              .setRemoteBranch(remoteBranch)
              .build();

      FetchGitAheadBehindResponse response = client.fetchGitAheadBehind(request);
      System.out.printf("Commits ahead: %d%n", response.getCommitsAhead());
      System.out.printf("Commits behind: %d%n", response.getCommitsBehind());
    }
  }
}
// [END dataform_v1beta1_dataform_fetch_git_ahead_behind]
