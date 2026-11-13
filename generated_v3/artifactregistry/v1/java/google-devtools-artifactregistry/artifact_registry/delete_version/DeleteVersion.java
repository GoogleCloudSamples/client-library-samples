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

// [START artifactregistry_v1_artifactregistry_version_delete]
import com.google.devtools.artifactregistry.v1.ArtifactRegistryClient;
import com.google.devtools.artifactregistry.v1.DeleteVersionRequest;
import com.google.devtools.artifactregistry.v1.VersionName;

public class DeleteVersion {

  public static void main(String[] args) throws Exception {
    String projectId = "example-project-id";
    String locationId = "us-central1";
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
      throws Exception {
    try (ArtifactRegistryClient client = ArtifactRegistryClient.create()) {
      DeleteVersionRequest request =
          DeleteVersionRequest.newBuilder()
              .setName(
                  VersionName.of(projectId, locationId, repositoryId, packageId, versionId)
                      .toString())
              .build();

      // DeleteVersion is a long-running operation; wait for it to complete.
      client.deleteVersionAsync(request).get();
      System.out.printf("Successfully deleted version: %s%n", request.getName());
    }
  }
}
// [END artifactregistry_v1_artifactregistry_version_delete]
