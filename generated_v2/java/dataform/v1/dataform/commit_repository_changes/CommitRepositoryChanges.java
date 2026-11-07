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

// [START dataform_v1_dataform_commit_repository_changes]
import com.google.cloud.dataform.v1.CommitAuthor;
import com.google.cloud.dataform.v1.CommitMetadata;
import com.google.cloud.dataform.v1.CommitRepositoryChangesRequest;
import com.google.cloud.dataform.v1.DataformClient;
import com.google.cloud.dataform.v1.RepositoryName;
import com.google.protobuf.ByteString;
import java.util.HashMap;
import java.util.Map;

public class CommitRepositoryChanges {

  public static void main(String[] args) throws Exception {
    String projectId = "example-project_id";
    String locationId = "example-location_id";
    String repositoryId = "example-repository_id";
    commitRepositoryChanges(projectId, locationId, repositoryId);
  }

  public static void commitRepositoryChanges(
      String projectId, String locationId, String repositoryId) throws Exception {
    try (DataformClient client = DataformClient.create()) {
      String name = RepositoryName.of(projectId, locationId, repositoryId).toString();
      CommitMetadata commitMetadata =
          CommitMetadata.newBuilder()
              .setAuthor(
                  CommitAuthor.newBuilder()
                      .setName("Example Developer")
                      .setEmailAddress("developer@example.com")
                      .build())
              .setCommitMessage("Add sample SQLX definition")
              .build();
      Map<String, CommitRepositoryChangesRequest.FileOperation> fileOperations = new HashMap<>();
      fileOperations.put(
          "definitions/sample.sqlx",
          CommitRepositoryChangesRequest.FileOperation.newBuilder()
              .setWriteFile(
                  CommitRepositoryChangesRequest.FileOperation.WriteFile.newBuilder()
                      .setContents(
                          ByteString.copyFromUtf8("config { type: \"table\" }\nSELECT 1 AS id\n"))
                      .build())
              .build());

      CommitRepositoryChangesRequest request =
          CommitRepositoryChangesRequest.newBuilder()
              .setName(name)
              .setCommitMetadata(commitMetadata)
              .putAllFileOperations(fileOperations)
              .build();

      client.commitRepositoryChanges(request);
      System.out.printf("Committed repository changes to: %s%n", name);
    }
  }
}
// [END dataform_v1_dataform_commit_repository_changes]
