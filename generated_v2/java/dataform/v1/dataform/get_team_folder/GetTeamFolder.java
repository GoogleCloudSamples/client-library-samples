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

// [START dataform_v1_dataform_teamfolder_get]
import com.google.cloud.dataform.v1.DataformClient;
import com.google.cloud.dataform.v1.GetTeamFolderRequest;
import com.google.cloud.dataform.v1.TeamFolder;
import java.io.IOException;

public class GetTeamFolder {

  public static void main(String[] args) throws Exception {
    String projectId = "example-project_id";
    String locationId = "example-location_id";
    String teamFolderId = "example-team_folder_id";
    getTeamFolder(projectId, locationId, teamFolderId);
  }

  public static void getTeamFolder(String projectId, String locationId, String teamFolderId)
      throws Exception {
    // Initialize the client using Application Default Credentials (ADC)
    try (DataformClient client = DataformClient.create()) {
      String name =
          String.format(
              "projects/%s/locations/%s/teamFolders/%s", projectId, locationId, teamFolderId);

      GetTeamFolderRequest request = GetTeamFolderRequest.newBuilder().setName(name).build();
      TeamFolder teamFolder = client.getTeamFolder(request);

      System.out.println("Retrieved team folder: " + teamFolder.getName());
    }
  }
}
// [END dataform_v1_dataform_teamfolder_get]
