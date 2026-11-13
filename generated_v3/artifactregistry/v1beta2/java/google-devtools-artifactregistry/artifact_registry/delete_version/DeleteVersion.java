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

// [START artifactregistry_v1beta2_artifactregistry_version_delete]
import com.google.devtools.artifactregistry.v1beta2.ArtifactRegistryClient;
import java.io.IOException;
import java.util.concurrent.ExecutionException;

public class DeleteVersion {

  public static void main(String[] args)
      throws IOException, ExecutionException, InterruptedException {
    String projectId = "example-project-id";
    String locationId = "example-location-id";
    String repositoryId = "example-repository-id";
    String packageId = "example-package-id";
    String versionId = "example-version-id";
    deleteVersion(projectId, locationId, repositoryId, packageId, versionId);
  }

  public static void deleteVersion(
      String projectId,
      String locationId,
      String repositoryId,
      String packageId,
      String versionId)
      throws IOException, ExecutionException, InterruptedException {
    // Initialize client that will be closed after use with try-with-resources.
    try (ArtifactRegistryClient client = ArtifactRegistryClient.create()) {
      String name =
          String.format(
              "projects/%s/locations/%s/repositories/%s/packages/%s/versions/%s",
              projectId, locationId, repositoryId, packageId, versionId);

      client.deleteVersionAsync(name).get();
      System.out.println("Deleted version: " + name);
    }
  }
}
// [END artifactregistry_v1beta2_artifactregistry_version_delete]
