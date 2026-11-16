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

// [START artifactregistry_v1_artifactregistry_package_update]
import com.google.devtools.artifactregistry.v1.ArtifactRegistryClient;
import com.google.devtools.artifactregistry.v1.Package;
import com.google.protobuf.FieldMask;
import java.io.IOException;

public class UpdatePackage {

  public static void main(String[] args) throws IOException {
    String projectId = "example-project-id";
    String locationId = "example-location-id";
    String repositoryId = "example-repository-id";
    String packageId = "example-package-id";
    updatePackage(projectId, locationId, repositoryId, packageId);
  }

  // Updates annotations on an Artifact Registry package.
  public static void updatePackage(
      String projectId, String locationId, String repositoryId, String packageId)
      throws IOException {
    try (ArtifactRegistryClient client = ArtifactRegistryClient.create()) {
      Package pkg =
          Package.newBuilder()
              .setName(
                  String.format(
                      "projects/%s/locations/%s/repositories/%s/packages/%s",
                      projectId, locationId, repositoryId, packageId))
              .putAnnotations("example-key", "example-value")
              .build();
      FieldMask updateMask = FieldMask.newBuilder().addPaths("annotations").build();

      Package response = client.updatePackage(pkg, updateMask);
      System.out.println("Updated package: " + response.getName());
    }
  }
}
// [END artifactregistry_v1_artifactregistry_package_update]
