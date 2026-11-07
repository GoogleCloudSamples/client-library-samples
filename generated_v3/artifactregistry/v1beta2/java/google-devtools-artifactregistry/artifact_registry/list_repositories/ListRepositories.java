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

// [START artifactregistry_v1beta2_artifactregistry_repositories_list]
import com.google.devtools.artifactregistry.v1beta2.ArtifactRegistryClient;
import com.google.devtools.artifactregistry.v1beta2.Repository;
import java.io.IOException;

public class ListRepositories {

  public static void main(String[] args) throws Exception {
    String projectId = "example-project-id";
    String locationId = "example-location-id";
    listRepositories(projectId, locationId);
  }

  public static void listRepositories(String projectId, String locationId) throws Exception {
    // Initialize the client that will be used to send requests. This client only needs to be created
    // once, and can be reused for multiple requests.
    try (ArtifactRegistryClient client = ArtifactRegistryClient.create()) {
      String parent = String.format("projects/%s/locations/%s", projectId, locationId);

      // Iterate through all repositories retrieved for the parent location.
      for (Repository repository : client.listRepositories(parent).iterateAll()) {
        System.out.println("Repository: " + repository.getName());
      }
    }
  }
}
// [END artifactregistry_v1beta2_artifactregistry_repositories_list]
