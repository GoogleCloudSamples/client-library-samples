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

// [START dataform_v1beta1_dataform_folder_update]
import com.google.cloud.dataform.v1beta1.DataformClient;
import com.google.cloud.dataform.v1beta1.Folder;
import com.google.protobuf.FieldMask;
import java.io.IOException;

public class UpdateFolder {

  public static void main(String[] args) throws IOException {
    String projectId = "example-project_id";
    String locationId = "example-location_id";
    String folderId = "example-folder_id";
    updateFolder(projectId, locationId, folderId);
  }

  public static void updateFolder(String projectId, String locationId, String folderId)
      throws IOException {
    try (DataformClient client = DataformClient.create()) {
      Folder folder =
          Folder.newBuilder()
              .setName(
                  String.format(
                      "projects/%s/locations/%s/folders/%s", projectId, locationId, folderId))
              .setDisplayName("Updated Folder Name " + System.currentTimeMillis())
              .build();
      FieldMask updateMask = FieldMask.newBuilder().addPaths("display_name").build();

      Folder response = client.updateFolder(folder, updateMask);
      System.out.println("Updated folder: " + response.getName());
    }
  }
}
// [END dataform_v1beta1_dataform_folder_update]
