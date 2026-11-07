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

// [START artifactregistry_v1_artifactregistry_versions_list]
import com.google.devtools.artifactregistry.v1.ArtifactRegistryClient;
import com.google.devtools.artifactregistry.v1.ListVersionsRequest;
import com.google.devtools.artifactregistry.v1.Version;

public class ListVersions {

  public static void main(String[] args) throws Exception {
    String projectId = "example-project-id";
    String locationId = "example-location-id";
    String repositoryId = "example-repository-id";
    String packageId = "example-package-id";
    listVersions(projectId, locationId, repositoryId, packageId);
  }

  public static void listVersions(
      String projectId, String locationId, String repositoryId, String packageId)
      throws Exception {
    // Initialize the client that will be used to send requests.
    // This client only needs to be created once, and can be reused for multiple requests.
    try (ArtifactRegistryClient client = ArtifactRegistryClient.create()) {
      String parent =
          String.format(
              "projects/%s/locations/%s/repositories/%s/packages/%s",
              projectId, locationId, repositoryId, packageId);

      ListVersionsRequest request = ListVersionsRequest.newBuilder().setParent(parent).build();

      for (Version version : client.listVersions(request).iterateAll()) {
        System.out.println("Version: " + version.getName());
        System.out.println("Description: " + version.getDescription());
        System.out.println("Create Time: " + version.getCreateTime());
      }
    }
  }
}
// [END artifactregistry_v1_artifactregistry_versions_list]
