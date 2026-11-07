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

// [START artifactregistry_v1_artifactregistry_version_update]
import com.google.devtools.artifactregistry.v1.ArtifactRegistryClient;
import com.google.devtools.artifactregistry.v1.Version;
import com.google.protobuf.FieldMask;

public class UpdateVersion {

  public static void main(String[] args) throws Exception {
    String projectId = "example-project-id";
    String locationId = "example-location-id";
    String repositoryId = "example-repository-id";
    String packageId = "example-package-id";
    String versionId = "example-version-id";
    updateVersion(projectId, locationId, repositoryId, packageId, versionId);
  }

  public static void updateVersion(
      String projectId,
      String locationId,
      String repositoryId,
      String packageId,
      String versionId)
      throws Exception {
    // Initialize the client with Application Default Credentials
    try (ArtifactRegistryClient client = ArtifactRegistryClient.create()) {
      Version version =
          Version.newBuilder()
              .setName(
                  String.format(
                      "projects/%s/locations/%s/repositories/%s/packages/%s/versions/%s",
                      projectId, locationId, repositoryId, packageId, versionId))
              .putAnnotations("team", "engineering")
              .build();
      FieldMask updateMask = FieldMask.newBuilder().addPaths("annotations").build();

      Version response = client.updateVersion(version, updateMask);
      System.out.println("Updated version: " + response.getName());
      System.out.println("Annotations: " + response.getAnnotationsMap());
    }
  }
}
// [END artifactregistry_v1_artifactregistry_version_update]
