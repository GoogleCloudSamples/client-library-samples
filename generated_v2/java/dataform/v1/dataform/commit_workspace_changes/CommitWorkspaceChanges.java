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

// [START dataform_v1_dataform_commit_workspace_changes]
import com.google.cloud.dataform.v1.CommitAuthor;
import com.google.cloud.dataform.v1.CommitWorkspaceChangesRequest;
import com.google.cloud.dataform.v1.DataformClient;
import com.google.cloud.dataform.v1.WorkspaceName;
import java.io.IOException;

public class CommitWorkspaceChanges {

  public static void main(String[] args) throws Exception {
    String projectId = "example-project-id";
    String locationId = "example-location-id";
    String repositoryId = "example-repository-id";
    String workspaceId = "example-workspace-id";
    commitWorkspaceChanges(projectId, locationId, repositoryId, workspaceId);
  }

  public static void commitWorkspaceChanges(
      String projectId, String locationId, String repositoryId, String workspaceId)
      throws Exception {
    try (DataformClient client = DataformClient.create()) {
      CommitAuthor author =
          CommitAuthor.newBuilder()
              .setName("Dataform Author")
              .setEmailAddress("author@example.com")
              .build();
      String name =
          WorkspaceName.of(projectId, locationId, repositoryId, workspaceId).toString();

      CommitWorkspaceChangesRequest request =
          CommitWorkspaceChangesRequest.newBuilder()
              .setName(name)
              .setAuthor(author)
              .setCommitMessage("Commit changes via Dataform API")
              .build();

      client.commitWorkspaceChanges(request);
      System.out.println("Committed changes in workspace: " + name);
    }
  }
}
// [END dataform_v1_dataform_commit_workspace_changes]
