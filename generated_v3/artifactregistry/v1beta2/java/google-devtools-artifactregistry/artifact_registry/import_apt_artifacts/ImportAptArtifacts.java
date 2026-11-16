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

// [START artifactregistry_v1beta2_artifactregistry_import_apt_artifacts]
import com.google.devtools.artifactregistry.v1beta2.AptArtifact;
import com.google.devtools.artifactregistry.v1beta2.ArtifactRegistryClient;
import com.google.devtools.artifactregistry.v1beta2.ImportAptArtifactsGcsSource;
import com.google.devtools.artifactregistry.v1beta2.ImportAptArtifactsRequest;
import com.google.devtools.artifactregistry.v1beta2.ImportAptArtifactsResponse;
import com.google.devtools.artifactregistry.v1beta2.RepositoryName;
import java.io.IOException;
import java.util.concurrent.ExecutionException;
import java.util.concurrent.TimeUnit;
import java.util.concurrent.TimeoutException;

public class ImportAptArtifacts {

  public static void main(String[] args) throws Exception {
    String projectId = "example-project_id";
    String locationId = "example-location_id";
    String repositoryId = "example-repository_id";
    String gcsSourceUris = "example-gcs_source_uris";
    importAptArtifacts(projectId, locationId, repositoryId, gcsSourceUris);
  }

  public static void importAptArtifacts(
      String projectId, String locationId, String repositoryId, String gcsSourceUris)
      throws Exception {
    // Initialize client that will be used to send requests. This client only needs to be created
    // once, and can be reused for multiple requests.
    try (ArtifactRegistryClient client = ArtifactRegistryClient.create()) {
      RepositoryName parent = RepositoryName.of(projectId, locationId, repositoryId);

      ImportAptArtifactsGcsSource gcsSource =
          ImportAptArtifactsGcsSource.newBuilder()
              .addUris(gcsSourceUris)
              .build();

      ImportAptArtifactsRequest request =
          ImportAptArtifactsRequest.newBuilder()
              .setParent(parent.toString())
              .setGcsSource(gcsSource)
              .build();

      // ImportAptArtifacts is a long-running operation; wait for operation completion.
      ImportAptArtifactsResponse response =
          client.importAptArtifactsAsync(request).get(10, TimeUnit.MINUTES);

      System.out.printf("Imported %d APT artifact(s).%n", response.getAptArtifactsCount());
      for (AptArtifact artifact : response.getAptArtifactsList()) {
        System.out.printf("Imported APT artifact: %s%n", artifact.getName());
      }
    }
  }
}
// [END artifactregistry_v1beta2_artifactregistry_import_apt_artifacts]
