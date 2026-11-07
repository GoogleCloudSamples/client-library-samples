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

// [START artifactregistry_v1_artifactregistry_versions_batchdelete]
import com.google.devtools.artifactregistry.v1.ArtifactRegistryClient;
import com.google.devtools.artifactregistry.v1.BatchDeleteVersionsRequest;
import com.google.devtools.artifactregistry.v1.PackageName;
import com.google.devtools.artifactregistry.v1.VersionName;
import java.io.IOException;
import java.util.concurrent.ExecutionException;
import java.util.concurrent.TimeUnit;
import java.util.concurrent.TimeoutException;

public class BatchDeleteVersions {

  public static void main(String[] args) throws Exception {
    String projectId = "example-project-id";
    String locationId = "us-central1";
    String repositoryId = "example-repository-id";
    String packageId = "example-package-id";
    String versionId = "example-version-id";
    batchDeleteVersions(projectId, locationId, repositoryId, packageId, versionId);
  }

  public static void batchDeleteVersions(
      String projectId, String locationId, String repositoryId, String packageId, String versionId)
      throws Exception {
    try (ArtifactRegistryClient client = ArtifactRegistryClient.create()) {
      String names =
          VersionName.of(projectId, locationId, repositoryId, packageId, versionId).toString();
      String parent = PackageName.of(projectId, locationId, repositoryId, packageId).toString();

      BatchDeleteVersionsRequest request =
          BatchDeleteVersionsRequest.newBuilder()
              .setParent(parent)
              .addNames(names)
              .build();

      client.batchDeleteVersionsAsync(request).get(2, TimeUnit.MINUTES);
      System.out.println("Batch delete versions completed successfully.");
    }
  }
}
// [END artifactregistry_v1_artifactregistry_versions_batchdelete]
