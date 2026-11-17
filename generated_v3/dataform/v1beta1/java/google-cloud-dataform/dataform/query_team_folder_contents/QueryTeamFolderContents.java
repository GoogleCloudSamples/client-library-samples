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

// [START dataform_v1beta1_dataform_query_team_folder_contents]
import com.google.cloud.dataform.v1beta1.DataformClient;
import com.google.cloud.dataform.v1beta1.QueryTeamFolderContentsRequest;

public class QueryTeamFolderContents {

  public static void main(String[] args) throws Exception {
    String projectId = "example-project-id";
    String locationId = "us-central1";
    String teamFolderId = "example-team-folder-id";
    queryTeamFolderContents(projectId, locationId, teamFolderId);
  }

  public static void queryTeamFolderContents(
      String projectId, String locationId, String teamFolderId) throws Exception {
    try (DataformClient client = DataformClient.create()) {
      String teamFolder =
          String.format(
              "projects/%s/locations/%s/teamFolders/%s", projectId, locationId, teamFolderId);

      QueryTeamFolderContentsRequest request =
          QueryTeamFolderContentsRequest.newBuilder().setTeamFolder(teamFolder).build();

      DataformClient.QueryTeamFolderContentsPagedResponse response =
          client.queryTeamFolderContents(request);

      System.out.println("Queried team folder contents successfully:");
      for (var entry : response.iterateAll()) {
        System.out.println("Entry: " + entry);
      }
    }
  }
}
// [END dataform_v1beta1_dataform_query_team_folder_contents]
