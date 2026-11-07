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

// [START dataform_v1_dataform_teamfolders_search]
import com.google.cloud.dataform.v1.DataformClient;
import com.google.cloud.dataform.v1.SearchTeamFoldersRequest;
import com.google.cloud.dataform.v1.SearchTeamFoldersResponse.TeamFolderSearchResult;
import java.io.IOException;

public class SearchTeamFolders {

  public static void main(String[] args) throws IOException {
    String projectId = "example-project-id";
    String locationId = "example-location-id";
    String location = String.format("projects/%s/locations/%s", projectId, locationId);
    searchTeamFolders(projectId, locationId, location);
  }

  public static void searchTeamFolders(String projectId, String locationId, String location)
      throws IOException {
    // Initialize the Dataform client inside try-with-resources for automatic cleanup.
    try (DataformClient client = DataformClient.create()) {
      SearchTeamFoldersRequest request =
          SearchTeamFoldersRequest.newBuilder()
              .setLocation(location)
              .build();

      for (TeamFolderSearchResult result : client.searchTeamFolders(request).iterateAll()) {
        System.out.println("Found team folder: " + result.getTeamFolder().getName());
      }
    }
  }
}
// [END dataform_v1_dataform_teamfolders_search]
