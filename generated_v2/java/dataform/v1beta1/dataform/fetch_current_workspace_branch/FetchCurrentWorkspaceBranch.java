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

// [START dataform_v1beta1_dataform_fetch_current_workspace_branch]
import com.google.cloud.dataform.v1beta1.DataformClient;
import com.google.cloud.dataform.v1beta1.GetWorkspaceRequest;
import com.google.cloud.dataform.v1beta1.Workspace;
import com.google.cloud.dataform.v1beta1.WorkspaceName;
import java.io.IOException;

public class FetchCurrentWorkspaceBranch {

  public static void main(String[] args) throws IOException {
    String projectId = "example-project-id";
    String locationId = "example-location-id";
    String repositoryId = "example-repository-id";
    String workspaceId = "example-workspace-id";
    fetchCurrentWorkspaceBranch(projectId, locationId, repositoryId, workspaceId);
  }

  public static void fetchCurrentWorkspaceBranch(
      String projectId, String locationId, String repositoryId, String workspaceId)
      throws IOException {
    // Initialize client that will be used to send requests. This client only needs to be created
    // once, and can be reused for multiple requests.
    try (DataformClient client = DataformClient.create()) {
      String name =
          WorkspaceName.of(projectId, locationId, repositoryId, workspaceId).toString();

      GetWorkspaceRequest request = GetWorkspaceRequest.newBuilder().setName(name).build();

      Workspace response = client.getWorkspace(request);
      System.out.println("Fetched workspace: " + response.getName());
    }
  }
}
// [END dataform_v1beta1_dataform_fetch_current_workspace_branch]
