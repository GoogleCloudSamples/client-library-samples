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

// [START artifactregistry_v1_artifactregistry_files_list]
import com.google.devtools.artifactregistry.v1.ArtifactRegistryClient;
import com.google.devtools.artifactregistry.v1.File;
import com.google.devtools.artifactregistry.v1.ListFilesRequest;
import com.google.devtools.artifactregistry.v1.RepositoryName;
import java.io.IOException;

public class ListFiles {

  public static void main(String[] args) throws IOException {
    String projectId = "example-project-id";
    String locationId = "example-location-id";
    String repositoryId = "example-repository-id";
    listFiles(projectId, locationId, repositoryId);
  }

  public static void listFiles(String projectId, String locationId, String repositoryId)
      throws IOException {
    try (ArtifactRegistryClient client = ArtifactRegistryClient.create()) {
      String parent = RepositoryName.of(projectId, locationId, repositoryId).toString();
      ListFilesRequest request = ListFilesRequest.newBuilder().setParent(parent).build();

      for (File file : client.listFiles(request).iterateAll()) {
        System.out.println("File name: " + file.getName());
        System.out.println("File size (bytes): " + file.getSizeBytes());
        System.out.println("Create time: " + file.getCreateTime());
      }
    }
  }
}
// [END artifactregistry_v1_artifactregistry_files_list]
