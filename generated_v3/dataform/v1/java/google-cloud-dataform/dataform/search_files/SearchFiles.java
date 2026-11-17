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

// [START dataform_v1_dataform_files_search]
import com.google.cloud.dataform.v1.DataformClient;
import com.google.cloud.dataform.v1.SearchFilesRequest;
import com.google.cloud.dataform.v1.SearchResult;
import com.google.cloud.dataform.v1.WorkspaceName;

public class SearchFiles {

  public static void main(String[] args) throws Exception {
    String projectId = "example-project_id";
    String locationId = "example-location_id";
    String repositoryId = "example-repository_id";
    String workspaceId = "example-workspace_id";
    searchFiles(projectId, locationId, repositoryId, workspaceId);
  }

  public static void searchFiles(
      String projectId, String locationId, String repositoryId, String workspaceId)
      throws Exception {
    // Initialize client that will be used to send requests. This client only needs to be created
    // once, and can be reused for multiple requests.
    try (DataformClient client = DataformClient.create()) {
      String workspace =
          WorkspaceName.of(projectId, locationId, repositoryId, workspaceId).toString();

      SearchFilesRequest request =
          SearchFilesRequest.newBuilder()
              .setWorkspace(workspace)
              .build();

      for (SearchResult result : client.searchFiles(request).iterateAll()) {
        if (result.hasFile()) {
          System.out.println("Found file: " + result.getFile().getPath());
        } else if (result.hasDirectory()) {
          System.out.println("Found directory: " + result.getDirectory().getPath());
        }
      }
    }
  }
}
// [END dataform_v1_dataform_files_search]
