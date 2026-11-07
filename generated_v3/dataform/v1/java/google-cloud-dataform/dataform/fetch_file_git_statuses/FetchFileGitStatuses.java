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

// [START dataform_v1_dataform_fetch_file_git_statuses]
import com.google.cloud.dataform.v1.DataformClient;
import com.google.cloud.dataform.v1.FetchFileGitStatusesRequest;
import com.google.cloud.dataform.v1.FetchFileGitStatusesResponse;
import com.google.cloud.dataform.v1.WorkspaceName;

public class FetchFileGitStatuses {

  public static void main(String[] args) throws Exception {
    String projectId = "example-project_id";
    String locationId = "example-location_id";
    String repositoryId = "example-repository_id";
    String workspaceId = "example-workspace_id";
    fetchFileGitStatuses(projectId, locationId, repositoryId, workspaceId);
  }

  public static void fetchFileGitStatuses(
      String projectId, String locationId, String repositoryId, String workspaceId)
      throws Exception {
    try (DataformClient client = DataformClient.create()) {
      String name = WorkspaceName.of(projectId, locationId, repositoryId, workspaceId).toString();

      FetchFileGitStatusesRequest request =
          FetchFileGitStatusesRequest.newBuilder().setName(name).build();

      FetchFileGitStatusesResponse response = client.fetchFileGitStatuses(request);

      System.out.println(
          "Fetched file Git statuses successfully. Changed files count: "
              + response.getUncommittedFileChangesCount());
      for (FetchFileGitStatusesResponse.UncommittedFileChange change :
          response.getUncommittedFileChangesList()) {
        System.out.printf("File: %s, State: %s%n", change.getPath(), change.getState());
      }
    }
  }
}
// [END dataform_v1_dataform_fetch_file_git_statuses]
