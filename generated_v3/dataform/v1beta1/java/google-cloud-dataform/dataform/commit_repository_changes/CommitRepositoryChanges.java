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

// [START dataform_v1beta1_dataform_commit_repository_changes]
import com.google.cloud.dataform.v1beta1.CommitAuthor;
import com.google.cloud.dataform.v1beta1.CommitMetadata;
import com.google.cloud.dataform.v1beta1.CommitRepositoryChangesRequest;
import com.google.cloud.dataform.v1beta1.DataformClient;
import com.google.cloud.dataform.v1beta1.RepositoryName;
import com.google.protobuf.ByteString;
import java.io.IOException;

public class CommitRepositoryChanges {

  public static void main(String[] args) throws IOException {
    String projectId = "example-project-id";
    String locationId = "example-location-id";
    String repositoryId = "example-repository-id";
    commitRepositoryChanges(projectId, locationId, repositoryId);
  }

  public static void commitRepositoryChanges(
      String projectId, String locationId, String repositoryId) throws IOException {
    // Initialize client that is used to send requests. This client only needs to be created
    // once and can be reused for multiple requests.
    try (DataformClient client = DataformClient.create()) {
      CommitAuthor author =
          CommitAuthor.newBuilder()
              .setName("example-author")
              .setEmailAddress("author@example.com")
              .build();

      CommitMetadata commitMetadata =
          CommitMetadata.newBuilder()
              .setAuthor(author)
              .setCommitMessage("Commit repository changes")
              .build();

      String name = RepositoryName.of(projectId, locationId, repositoryId).toString();

      CommitRepositoryChangesRequest.FileOperation.WriteFile writeFile =
          CommitRepositoryChangesRequest.FileOperation.WriteFile.newBuilder()
              .setContents(ByteString.copyFromUtf8("Sample file content"))
              .build();

      CommitRepositoryChangesRequest.FileOperation fileOperation =
          CommitRepositoryChangesRequest.FileOperation.newBuilder()
              .setWriteFile(writeFile)
              .build();

      CommitRepositoryChangesRequest request =
          CommitRepositoryChangesRequest.newBuilder()
              .setName(name)
              .setCommitMetadata(commitMetadata)
              .putFileOperations("README.md", fileOperation)
              .build();

      client.commitRepositoryChanges(request);
      System.out.println("Committed changes to repository: " + name);
    }
  }
}
// [END dataform_v1beta1_dataform_commit_repository_changes]
