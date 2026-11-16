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

// [START artifactregistry_v1_artifactregistry_package_get]
import com.google.devtools.artifactregistry.v1.ArtifactRegistryClient;
import com.google.devtools.artifactregistry.v1.GetPackageRequest;
import com.google.devtools.artifactregistry.v1.Package;
import java.io.IOException;

public class GetPackage {

  public static void main(String[] args) throws IOException {
    String projectId = "example-project-id";
    String locationId = "example-location-id";
    String repositoryId = "example-repository-id";
    String packageId = "example-package-id";
    getPackage(projectId, locationId, repositoryId, packageId);
  }

  public static void getPackage(
      String projectId, String locationId, String repositoryId, String packageId)
      throws IOException {
    // Initialize the client with try-with-resources for automatic resource cleanup.
    try (ArtifactRegistryClient client = ArtifactRegistryClient.create()) {
      String name =
          String.format(
              "projects/%s/locations/%s/repositories/%s/packages/%s",
              projectId, locationId, repositoryId, packageId);

      GetPackageRequest request = GetPackageRequest.newBuilder().setName(name).build();

      Package response = client.getPackage(request);
      System.out.println("Package name: " + response.getName());
      System.out.println("Display name: " + response.getDisplayName());
    }
  }
}
// [END artifactregistry_v1_artifactregistry_package_get]
