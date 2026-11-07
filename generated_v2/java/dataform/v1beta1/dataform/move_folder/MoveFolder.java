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

// [START dataform_v1beta1_dataform_move_folder]
import com.google.api.gax.rpc.UnknownException;
import com.google.cloud.dataform.v1beta1.DataformClient;
import com.google.cloud.dataform.v1beta1.MoveFolderRequest;
import java.util.concurrent.ExecutionException;

public class MoveFolder {

  public static void main(String[] args) throws Exception {
    String projectId = "example-project-id";
    String locationId = "example-location-id";
    String folderId = "example-folder-id";
    String destinationFolderId = "example-destination-folder-id";
    moveFolder(projectId, locationId, folderId, destinationFolderId);
  }

  public static void moveFolder(
      String projectId, String locationId, String folderId, String destinationFolderId)
      throws Exception {
    try (DataformClient client = DataformClient.create()) {
      String name =
          String.format("projects/%s/locations/%s/folders/%s", projectId, locationId, folderId);
      String destinationContainingFolder =
          destinationFolderId == null || destinationFolderId.isEmpty()
              ? ""
              : String.format(
                  "projects/%s/locations/%s/folders/%s",
                  projectId, locationId, destinationFolderId);

      MoveFolderRequest request =
          MoveFolderRequest.newBuilder()
              .setName(name)
              .setDestinationContainingFolder(destinationContainingFolder)
              .build();

      try {
        client.moveFolderAsync(request).get();
      } catch (ExecutionException e) {
        // The service returns a Folder response, while the client library expects Empty.
        if (e.getCause() instanceof UnknownException
            && e.getMessage() != null
            && e.getMessage().contains("succeeded")) {
          // The operation completed successfully on the server despite the unpacking mismatch.
        } else {
          throw e;
        }
      }

      System.out.println("Folder moved successfully: " + name);
    }
  }
}
// [END dataform_v1beta1_dataform_move_folder]
