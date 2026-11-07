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

// [START dataform_v1beta1_dataform_fetch_repository_history]
import com.google.cloud.dataform.v1beta1.CommitLogEntry;
import com.google.cloud.dataform.v1beta1.DataformClient;
import com.google.cloud.dataform.v1beta1.FetchRepositoryHistoryRequest;
import com.google.cloud.dataform.v1beta1.RepositoryName;
import java.io.IOException;
import java.util.concurrent.ExecutionException;
import java.util.concurrent.TimeUnit;
import java.util.concurrent.TimeoutException;

public class FetchRepositoryHistory {

  public static void main(String[] args) throws Exception {
    String projectId = "example-project_id";
    String locationId = "example-location_id";
    String repositoryId = "example-repository_id";
    fetchRepositoryHistory(projectId, locationId, repositoryId);
  }

  public static void fetchRepositoryHistory(
      String projectId, String locationId, String repositoryId) throws Exception {
    try (DataformClient client = DataformClient.create()) {
      // FetchRepositoryHistory requires that git_remote_settings.url is not configured.
      String name = RepositoryName.of(projectId, locationId, repositoryId).toString();
      FetchRepositoryHistoryRequest request =
          FetchRepositoryHistoryRequest.newBuilder().setName(name).build();

      for (CommitLogEntry entry : client.fetchRepositoryHistory(request).iterateAll()) {
        System.out.println("Commit SHA: " + entry.getCommitSha());
        System.out.println("Commit message: " + entry.getCommitMessage());
      }
    }
  }
}
// [END dataform_v1beta1_dataform_fetch_repository_history]
