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

// [START artifactregistry_v1_artifactregistry_version_get]
import com.google.devtools.artifactregistry.v1.ArtifactRegistryClient;
import com.google.devtools.artifactregistry.v1.GetVersionRequest;
import com.google.devtools.artifactregistry.v1.Version;
import com.google.devtools.artifactregistry.v1.VersionName;
import java.io.IOException;

public class GetVersion {

  public static void main(String[] args) throws IOException {
    String projectId = "example-project-id";
    String locationId = "example-location-id";
    String repositoryId = "example-repository-id";
    String packageId = "example-package-id";
    String versionId = "example-version-id";
    getVersion(projectId, locationId, repositoryId, packageId, versionId);
  }

  public static void getVersion(
      String projectId,
      String locationId,
      String repositoryId,
      String packageId,
      String versionId)
      throws IOException {
    try (ArtifactRegistryClient client = ArtifactRegistryClient.create()) {
      String name =
          VersionName.of(projectId, locationId, repositoryId, packageId, versionId).toString();
      GetVersionRequest request = GetVersionRequest.newBuilder().setName(name).build();
      Version response = client.getVersion(request);

      System.out.println("Retrieved version: " + response.getName());
      System.out.println("Description: " + response.getDescription());
    }
  }
}
// [END artifactregistry_v1_artifactregistry_version_get]
