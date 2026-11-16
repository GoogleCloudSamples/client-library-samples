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

// [START artifactregistry_v1_artifactregistry_repository_get]
import com.google.devtools.artifactregistry.v1.ArtifactRegistryClient;
import com.google.devtools.artifactregistry.v1.GetRepositoryRequest;
import com.google.devtools.artifactregistry.v1.Repository;
import com.google.devtools.artifactregistry.v1.RepositoryName;

public class GetRepository {

  public static void main(String[] args) throws Exception {
    String projectId = "example-project-id";
    String locationId = "example-location-id";
    String repositoryId = "example-repository-id";
    getRepository(projectId, locationId, repositoryId);
  }

  public static void getRepository(String projectId, String locationId, String repositoryId)
      throws Exception {
    // Initialize the client once for reuse across multiple requests.
    try (ArtifactRegistryClient client = ArtifactRegistryClient.create()) {
      String name = RepositoryName.of(projectId, locationId, repositoryId).toString();
      GetRepositoryRequest request = GetRepositoryRequest.newBuilder().setName(name).build();

      Repository repository = client.getRepository(request);

      System.out.println("Repository: " + repository.getName());
      System.out.println("Format: " + repository.getFormat());
      System.out.println("Description: " + repository.getDescription());
    }
  }
}
// [END artifactregistry_v1_artifactregistry_repository_get]
