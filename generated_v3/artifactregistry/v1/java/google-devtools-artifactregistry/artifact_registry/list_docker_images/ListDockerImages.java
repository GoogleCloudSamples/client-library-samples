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

// [START artifactregistry_v1_artifactregistry_dockerimages_list]
import com.google.devtools.artifactregistry.v1.ArtifactRegistryClient;
import com.google.devtools.artifactregistry.v1.DockerImage;
import com.google.devtools.artifactregistry.v1.ListDockerImagesRequest;
import com.google.devtools.artifactregistry.v1.RepositoryName;

public class ListDockerImages {

  public static void main(String[] args) throws Exception {
    String projectId = "example-project-id";
    String locationId = "example-location-id";
    String repositoryId = "example-repository-id";
    listDockerImages(projectId, locationId, repositoryId);
  }

  public static void listDockerImages(String projectId, String locationId, String repositoryId)
      throws Exception {
    // Initialize client that will be closed when the block is finished.
    try (ArtifactRegistryClient client = ArtifactRegistryClient.create()) {
      String parent = RepositoryName.of(projectId, locationId, repositoryId).toString();

      ListDockerImagesRequest request =
          ListDockerImagesRequest.newBuilder().setParent(parent).build();

      for (DockerImage image : client.listDockerImages(request).iterateAll()) {
        System.out.println("Docker image: " + image.getName());
        System.out.println("URI: " + image.getUri());
        System.out.println("Tags: " + image.getTagsList());
        System.out.println("Upload time: " + image.getUploadTime());
      }
    }
  }
}
// [END artifactregistry_v1_artifactregistry_dockerimages_list]
