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

// [START dataform_v1_dataform_folder_get]
import com.google.cloud.dataform.v1.DataformClient;
import com.google.cloud.dataform.v1.Folder;
import com.google.cloud.dataform.v1.FolderName;
import java.io.IOException;

public class GetFolder {

  public static void main(String[] args) throws Exception {
    String projectId = "example-project-id";
    String locationId = "example-location-id";
    String folderId = "example-folder-id";
    getFolder(projectId, locationId, folderId);
  }

  public static void getFolder(String projectId, String locationId, String folderId)
      throws Exception {
    // Initialize client that will be used to send requests. This client only needs to be created
    // once, and can be reused for multiple requests.
    try (DataformClient client = DataformClient.create()) {
      String name = FolderName.of(projectId, locationId, folderId).toString();
      Folder folder = client.getFolder(name);
      System.out.println("Retrieved folder: " + folder.getName());
    }
  }
}
// [END dataform_v1_dataform_folder_get]
