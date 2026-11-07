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

// [START dataform_v1_dataform_folder_delete]
import com.google.cloud.dataform.v1.DataformClient;
import com.google.cloud.dataform.v1.DeleteFolderRequest;
import com.google.cloud.dataform.v1.FolderName;

public class DeleteFolder {

  public static void main(String[] args) throws Exception {
    String projectId = "example-project_id";
    String locationId = "example-location_id";
    String folderId = "example-folder_id";
    deleteFolder(projectId, locationId, folderId);
  }

  public static void deleteFolder(String projectId, String locationId, String folderId)
      throws Exception {
    try (DataformClient client = DataformClient.create()) {
      String name = FolderName.of(projectId, locationId, folderId).toString();

      DeleteFolderRequest request = DeleteFolderRequest.newBuilder().setName(name).build();
      client.deleteFolder(request);
      System.out.println("Deleted folder: " + name);
    }
  }
}
// [END dataform_v1_dataform_folder_delete]
