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

// [START dataform_v1beta1_dataform_teamfolder_delete]
import com.google.cloud.dataform.v1beta1.DataformClient;
import com.google.cloud.dataform.v1beta1.DeleteTeamFolderRequest;
import com.google.cloud.dataform.v1beta1.TeamFolderName;

public class DeleteTeamFolder {

  public static void main(String[] args) throws Exception {
    String projectId = "example-project_id";
    String locationId = "example-location_id";
    String teamFolderId = "example-team_folder_id";
    deleteTeamFolder(projectId, locationId, teamFolderId);
  }

  public static void deleteTeamFolder(String projectId, String locationId, String teamFolderId)
      throws Exception {
    try (DataformClient client = DataformClient.create()) {
      String name = TeamFolderName.of(projectId, locationId, teamFolderId).toString();
      DeleteTeamFolderRequest request =
          DeleteTeamFolderRequest.newBuilder()
              .setName(name)
              .build();

      client.deleteTeamFolder(request);
      System.out.println("Deleted team folder: " + name);
    }
  }
}
// [END dataform_v1beta1_dataform_teamfolder_delete]
