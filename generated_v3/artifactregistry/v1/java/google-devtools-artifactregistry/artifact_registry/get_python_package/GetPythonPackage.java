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

// [START artifactregistry_v1_artifactregistry_pythonpackage_get]
import com.google.devtools.artifactregistry.v1.ArtifactRegistryClient;
import com.google.devtools.artifactregistry.v1.GetPythonPackageRequest;
import com.google.devtools.artifactregistry.v1.PythonPackage;
import java.io.IOException;

public class GetPythonPackage {

  public static void main(String[] args) throws IOException {
    String projectId = "example-project-id";
    String locationId = "example-location-id";
    String repositoryId = "example-repository-id";
    String pythonPackageId = "example-python-package-id";
    getPythonPackage(projectId, locationId, repositoryId, pythonPackageId);
  }

  public static void getPythonPackage(
      String projectId, String locationId, String repositoryId, String pythonPackageId)
      throws IOException {
    // Initialize client that will be closed when the block exits.
    try (ArtifactRegistryClient client = ArtifactRegistryClient.create()) {
      String name =
          String.format(
              "projects/%s/locations/%s/repositories/%s/pythonPackages/%s",
              projectId, locationId, repositoryId, pythonPackageId);

      GetPythonPackageRequest request = GetPythonPackageRequest.newBuilder().setName(name).build();

      PythonPackage pythonPackage = client.getPythonPackage(request);

      System.out.println("Retrieved Python package: " + pythonPackage.getName());
      System.out.println("Package URI: " + pythonPackage.getUri());
      System.out.println("Create time: " + pythonPackage.getCreateTime());
    }
  }
}
// [END artifactregistry_v1_artifactregistry_pythonpackage_get]
