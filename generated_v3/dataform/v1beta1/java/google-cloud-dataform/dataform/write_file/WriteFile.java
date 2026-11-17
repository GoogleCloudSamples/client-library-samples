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

// [START dataform_v1beta1_dataform_write_file]
import com.google.cloud.dataform.v1beta1.DataformClient;
import com.google.cloud.dataform.v1beta1.WorkspaceName;
import com.google.cloud.dataform.v1beta1.WriteFileRequest;
import com.google.cloud.dataform.v1beta1.WriteFileResponse;
import com.google.protobuf.ByteString;
import java.io.IOException;
import java.nio.charset.StandardCharsets;

public class WriteFile {

  public static void main(String[] args) throws Exception {
    String projectId = "example-project-id";
    String locationId = "us-central1";
    String repositoryId = "example-repository-id";
    String workspaceId = "example-workspace-id";
    writeFile(projectId, locationId, repositoryId, workspaceId);
  }

  public static void writeFile(
      String projectId, String locationId, String repositoryId, String workspaceId)
      throws Exception {
    // Initialize client that will be used to send requests. This client only needs to be created
    // once, and can be reused for multiple requests.
    try (DataformClient client = DataformClient.create()) {
      byte[] contents =
          "config { type: \"view\" }\nSELECT 1 AS count\n".getBytes(StandardCharsets.UTF_8);
      String path = "definitions/example_table.sqlx";
      String workspace =
          WorkspaceName.of(projectId, locationId, repositoryId, workspaceId).toString();

      WriteFileRequest request =
          WriteFileRequest.newBuilder()
              .setWorkspace(workspace)
              .setPath(path)
              .setContents(ByteString.copyFrom(contents))
              .build();

      WriteFileResponse response = client.writeFile(request);
      System.out.println("Wrote file to workspace: " + path);
    }
  }
}
// [END dataform_v1beta1_dataform_write_file]
