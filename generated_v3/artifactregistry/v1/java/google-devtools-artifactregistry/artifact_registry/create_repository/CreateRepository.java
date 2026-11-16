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

package com.google.cloud.artifactregistry.v1;

// [START artifactregistry_v1_artifactregistry_repository_create]
import com.google.devtools.artifactregistry.v1.ArtifactRegistryClient;
import com.google.devtools.artifactregistry.v1.Repository;
import java.io.IOException;
import java.util.concurrent.ExecutionException;

public class CreateRepository {

  public static void main(String[] args) throws Exception {
    String repositoryId = "example-repository-id";
    String projectId = "example-project-id";
    String locationId = "example-location-id";
    createRepository(repositoryId, projectId, locationId);
  }

  public static void createRepository(String repositoryId, String projectId, String locationId)
      throws IOException, ExecutionException, InterruptedException {
    // Initialize client that will be automatically closed after use.
    try (ArtifactRegistryClient client = ArtifactRegistryClient.create()) {
      String parent = String.format("projects/%s/locations/%s", projectId, locationId);

      Repository repository =
          Repository.newBuilder()
              .setFormat(Repository.Format.DOCKER)
              .setDescription("Example Docker repository")
              .build();

      // CreateRepository is a long-running operation; block until creation completes.
      Repository createdRepository =
          client.createRepositoryAsync(parent, repository, repositoryId).get();

      System.out.println("Created repository: " + createdRepository.getName());
    }
  }
}
// [END artifactregistry_v1_artifactregistry_repository_create]
