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

// [START dataform_v1_dataform_query_team_folder_contents]
import com.google.cloud.dataform.v1.DataformClient;
import com.google.cloud.dataform.v1.QueryTeamFolderContentsRequest;

public class QueryTeamFolderContents {

  public static void main(String[] args) throws Exception {
    String projectId = "example-project_id";
    String locationId = "example-location_id";
    String teamFolderId = "example-team_folder_id";
    queryTeamFolderContents(projectId, locationId, teamFolderId);
  }

  public static void queryTeamFolderContents(
      String projectId, String locationId, String teamFolderId) throws Exception {
    // Initialize the Dataform client using Application Default Credentials (ADC).
    try (DataformClient client = DataformClient.create()) {
      String teamFolder =
          String.format(
              "projects/%s/locations/%s/teamFolders/%s", projectId, locationId, teamFolderId);

      QueryTeamFolderContentsRequest request =
          QueryTeamFolderContentsRequest.newBuilder().setTeamFolder(teamFolder).build();

      // Retrieve and print each entry found in the team folder.
      for (var content : client.queryTeamFolderContents(request).iterateAll()) {
        System.out.println("Found content: " + content);
      }
      System.out.println("Queried team folder contents successfully.");
    }
  }
}
// [END dataform_v1_dataform_query_team_folder_contents]
