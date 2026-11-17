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

// [START dataform_v1beta1_dataform_folder_delete]
import com.google.cloud.dataform.v1beta1.DataformClient;
import com.google.cloud.dataform.v1beta1.DeleteFolderRequest;

public class DeleteFolder {

  public static void main(String[] args) throws Exception {
    String projectId = "example-project-id";
    String locationId = "example-location-id";
    String folderId = "example-folder-id";
    deleteFolder(projectId, locationId, folderId);
  }

  public static void deleteFolder(String projectId, String locationId, String folderId) throws Exception {
    try (DataformClient client = DataformClient.create()) {
      String name = String.format("projects/%s/locations/%s/folders/%s", projectId, locationId, folderId);
      DeleteFolderRequest request = DeleteFolderRequest.newBuilder()
          .setName(name)
          .build();

      client.deleteFolder(request);
      System.out.println("Deleted folder: " + name);
    }
  }
}
// [END dataform_v1beta1_dataform_folder_delete]
