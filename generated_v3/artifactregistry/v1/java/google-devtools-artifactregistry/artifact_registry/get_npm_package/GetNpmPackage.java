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

// [START artifactregistry_v1_artifactregistry_npmpackage_get]
import com.google.devtools.artifactregistry.v1.ArtifactRegistryClient;
import com.google.devtools.artifactregistry.v1.NpmPackage;
import com.google.devtools.artifactregistry.v1.NpmPackageName;
import java.io.IOException;

public class GetNpmPackage {

  public static void main(String[] args) throws IOException {
    String projectId = "example-project-id";
    String locationId = "example-location-id";
    String repositoryId = "example-repository-id";
    String npmPackageId = "example-npm-package-id";
    getNpmPackage(projectId, locationId, repositoryId, npmPackageId);
  }

  public static void getNpmPackage(
      String projectId, String locationId, String repositoryId, String npmPackageId)
      throws IOException {
    // Initialize client that will be automatically closed after use.
    try (ArtifactRegistryClient client = ArtifactRegistryClient.create()) {
      String name =
          NpmPackageName.of(projectId, locationId, repositoryId, npmPackageId).toString();

      NpmPackage npmPackage = client.getNpmPackage(name);
      System.out.println("Retrieved npm package: " + npmPackage.getName());
    }
  }
}
// [END artifactregistry_v1_artifactregistry_npmpackage_get]
