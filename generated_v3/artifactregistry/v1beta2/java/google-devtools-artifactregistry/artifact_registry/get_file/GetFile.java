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

// [START artifactregistry_v1beta2_artifactregistry_file_get]
import com.google.devtools.artifactregistry.v1beta2.ArtifactRegistryClient;
import com.google.devtools.artifactregistry.v1beta2.File;
import com.google.devtools.artifactregistry.v1beta2.GetFileRequest;
import java.io.IOException;

public class GetFile {

  public static void main(String[] args) throws IOException {
    String projectId = "example-project-id";
    String locationId = "example-location-id";
    String repositoryId = "example-repository-id";
    String fileId = "example-file-id";
    getFile(projectId, locationId, repositoryId, fileId);
  }

  public static void getFile(
      String projectId, String locationId, String repositoryId, String fileId)
      throws IOException {
    try (ArtifactRegistryClient client = ArtifactRegistryClient.create()) {
      String name =
          String.format(
              "projects/%s/locations/%s/repositories/%s/files/%s",
              projectId, locationId, repositoryId, fileId);

      GetFileRequest request = GetFileRequest.newBuilder().setName(name).build();
      File file = client.getFile(request);

      System.out.println("File name: " + file.getName());
      System.out.println("Size: " + file.getSizeBytes() + " bytes");
    }
  }
}
// [END artifactregistry_v1beta2_artifactregistry_file_get]
