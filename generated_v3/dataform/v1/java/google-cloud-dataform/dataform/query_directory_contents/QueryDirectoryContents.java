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

// [START dataform_v1_dataform_query_directory_contents]
import com.google.cloud.dataform.v1.DataformClient;
import com.google.cloud.dataform.v1.DirectoryEntry;
import com.google.cloud.dataform.v1.QueryDirectoryContentsRequest;
import com.google.cloud.dataform.v1.WorkspaceName;

public class QueryDirectoryContents {

  public static void main(String[] args) throws Exception {
    String projectId = "example-project_id";
    String locationId = "example-location_id";
    String repositoryId = "example-repository_id";
    String workspaceId = "example-workspace_id";
    queryDirectoryContents(projectId, locationId, repositoryId, workspaceId);
  }

  public static void queryDirectoryContents(
      String projectId, String locationId, String repositoryId, String workspaceId)
      throws Exception {
    // Initialize client that will be closed automatically with the try-with-resources statement.
    try (DataformClient client = DataformClient.create()) {
      String workspace =
          WorkspaceName.of(projectId, locationId, repositoryId, workspaceId).toString();

      QueryDirectoryContentsRequest request =
          QueryDirectoryContentsRequest.newBuilder().setWorkspace(workspace).build();

      for (DirectoryEntry entry : client.queryDirectoryContents(request).iterateAll()) {
        if (entry.hasFile()) {
          System.out.println("File: " + entry.getFile());
        } else if (entry.hasDirectory()) {
          System.out.println("Directory: " + entry.getDirectory());
        }
      }
    }
  }
}
// [END dataform_v1_dataform_query_directory_contents]
