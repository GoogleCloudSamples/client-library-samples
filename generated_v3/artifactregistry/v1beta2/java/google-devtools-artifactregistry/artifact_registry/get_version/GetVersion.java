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

// [START artifactregistry_v1beta2_artifactregistry_version_get]
import com.google.devtools.artifactregistry.v1beta2.ArtifactRegistryClient;
import com.google.devtools.artifactregistry.v1beta2.GetVersionRequest;
import com.google.devtools.artifactregistry.v1beta2.Version;
import java.io.IOException;

public class GetVersion {

  public static void main(String[] args) throws IOException {
    String projectId = "example-project_id";
    String locationId = "example-location_id";
    String repositoryId = "example-repository_id";
    String packageId = "example-package_id";
    String versionId = "example-version_id";
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
          String.format(
              "projects/%s/locations/%s/repositories/%s/packages/%s/versions/%s",
              projectId, locationId, repositoryId, packageId, versionId);

      GetVersionRequest request = GetVersionRequest.newBuilder().setName(name).build();
      Version response = client.getVersion(request);

      System.out.println("Retrieved version: " + response.getName());
      System.out.println("Description: " + response.getDescription());
      System.out.println("Create time: " + response.getCreateTime());
    }
  }
}
// [END artifactregistry_v1beta2_artifactregistry_version_get]
