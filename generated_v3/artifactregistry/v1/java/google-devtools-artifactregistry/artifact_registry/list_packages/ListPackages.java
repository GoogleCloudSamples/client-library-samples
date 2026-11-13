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

// [START artifactregistry_v1_artifactregistry_packages_list]
import com.google.devtools.artifactregistry.v1.ArtifactRegistryClient;
import com.google.devtools.artifactregistry.v1.ListPackagesRequest;
import com.google.devtools.artifactregistry.v1.Package;
import com.google.devtools.artifactregistry.v1.RepositoryName;

public class ListPackages {

  public static void main(String[] args) throws Exception {
    String projectId = "example-project-id";
    String locationId = "example-location-id";
    String repositoryId = "example-repository-id";
    listPackages(projectId, locationId, repositoryId);
  }

  public static void listPackages(String projectId, String locationId, String repositoryId)
      throws Exception {
    try (ArtifactRegistryClient client = ArtifactRegistryClient.create()) {
      String parent = RepositoryName.of(projectId, locationId, repositoryId).toString();
      ListPackagesRequest request = ListPackagesRequest.newBuilder().setParent(parent).build();

      for (Package artifactPackage : client.listPackages(request).iterateAll()) {
        System.out.println("Package: " + artifactPackage.getName());
      }
    }
  }
}
// [END artifactregistry_v1_artifactregistry_packages_list]
