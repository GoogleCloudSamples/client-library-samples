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

package com.google.cloud.artifactregistry.v1beta2;

// [START artifactregistry_v1beta2_artifactregistry_repository_update]
import com.google.devtools.artifactregistry.v1beta2.ArtifactRegistryClient;
import com.google.devtools.artifactregistry.v1beta2.Repository;
import com.google.protobuf.FieldMask;
import java.io.IOException;

public class UpdateRepository {

  public static void main(String[] args) throws Exception {
    String projectId = "example-project-id";
    String locationId = "example-location-id";
    String repositoryId = "example-repository-id";
    updateRepository(projectId, locationId, repositoryId);
  }

  public static void updateRepository(String projectId, String locationId, String repositoryId)
      throws Exception {
    try (ArtifactRegistryClient client = ArtifactRegistryClient.create()) {
      String repositoryName =
          String.format(
              "projects/%s/locations/%s/repositories/%s", projectId, locationId, repositoryId);

      Repository repository =
          Repository.newBuilder()
              .setName(repositoryName)
              .setDescription("Updated repository description")
              .build();

      FieldMask updateMask = FieldMask.newBuilder().addPaths("description").build();

      Repository updatedRepository = client.updateRepository(repository, updateMask);
      System.out.println("Updated repository: " + updatedRepository.getName());
      System.out.println("Updated description: " + updatedRepository.getDescription());
    }
  }
}
// [END artifactregistry_v1beta2_artifactregistry_repository_update]
