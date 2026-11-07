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

// [START artifactregistry_v1_artifactregistry_mavenartifact_get]
import com.google.devtools.artifactregistry.v1.ArtifactRegistryClient;
import com.google.devtools.artifactregistry.v1.MavenArtifact;
import com.google.devtools.artifactregistry.v1.MavenArtifactName;

public class GetMavenArtifact {

  public static void main(String[] args) throws Exception {
    String projectId = "example-project-id";
    String locationId = "example-location-id";
    String repositoryId = "example-repository-id";
    String mavenArtifactId = "example-maven-artifact-id";
    getMavenArtifact(projectId, locationId, repositoryId, mavenArtifactId);
  }

  public static void getMavenArtifact(
      String projectId, String locationId, String repositoryId, String mavenArtifactId)
      throws Exception {
    // Initialize client that will be used to send requests. This client only needs to be created
    // once, and can be reused for multiple requests.
    try (ArtifactRegistryClient client = ArtifactRegistryClient.create()) {
      String name =
          MavenArtifactName.of(projectId, locationId, repositoryId, mavenArtifactId).toString();

      MavenArtifact response = client.getMavenArtifact(name);
      System.out.println("Maven artifact retrieved successfully: " + response.getName());
      System.out.println("POM URI: " + response.getPomUri());
    }
  }
}
// [END artifactregistry_v1_artifactregistry_mavenartifact_get]
