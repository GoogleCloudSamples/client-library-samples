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

// [START artifactregistry_v1beta2_artifactregistry_packages_list]
import com.google.devtools.artifactregistry.v1beta2.ArtifactRegistryClient;
import com.google.devtools.artifactregistry.v1beta2.Package;
import com.google.devtools.artifactregistry.v1beta2.RepositoryName;
import java.io.IOException;

public class ListPackages {

  public static void main(String[] args) throws IOException {
    String projectId = "example-project-id";
    String locationId = "example-location-id";
    String repositoryId = "example-repository-id";
    listPackages(projectId, locationId, repositoryId);
  }

  public static void listPackages(String projectId, String locationId, String repositoryId)
      throws IOException {
    // Initialize client that will be closed when needed with the try-with-resources statement.
    try (ArtifactRegistryClient client = ArtifactRegistryClient.create()) {
      String parent = RepositoryName.of(projectId, locationId, repositoryId).toString();

      for (Package currentPackage : client.listPackages(parent).iterateAll()) {
        System.out.println("Package name: " + currentPackage.getName());
      }
    }
  }
}
// [END artifactregistry_v1beta2_artifactregistry_packages_list]
