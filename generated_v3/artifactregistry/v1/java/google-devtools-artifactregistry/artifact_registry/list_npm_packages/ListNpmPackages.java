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

// [START artifactregistry_v1_artifactregistry_npmpackages_list]
import com.google.devtools.artifactregistry.v1.ArtifactRegistryClient;
import com.google.devtools.artifactregistry.v1.ListNpmPackagesRequest;
import com.google.devtools.artifactregistry.v1.NpmPackage;
import java.io.IOException;

public class ListNpmPackages {

  public static void main(String[] args) throws Exception {
    String projectId = "example-project-id";
    String locationId = "example-location-id";
    String repositoryId = "example-repository-id";
    listNpmPackages(projectId, locationId, repositoryId);
  }

  public static void listNpmPackages(String projectId, String locationId, String repositoryId)
      throws Exception {
    try (ArtifactRegistryClient client = ArtifactRegistryClient.create()) {
      String parent =
          String.format("projects/%s/locations/%s/repositories/%s", projectId, locationId, repositoryId);

      ListNpmPackagesRequest request =
          ListNpmPackagesRequest.newBuilder()
              .setParent(parent)
              .build();

      for (NpmPackage npmPackage : client.listNpmPackages(request).iterateAll()) {
        System.out.println("Package name: " + npmPackage.getName());
      }
    }
  }
}
// [END artifactregistry_v1_artifactregistry_npmpackages_list]
