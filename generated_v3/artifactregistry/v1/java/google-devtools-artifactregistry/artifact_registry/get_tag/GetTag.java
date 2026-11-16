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

// [START artifactregistry_v1_artifactregistry_tag_get]
import com.google.devtools.artifactregistry.v1.ArtifactRegistryClient;
import com.google.devtools.artifactregistry.v1.GetTagRequest;
import com.google.devtools.artifactregistry.v1.Tag;
import com.google.devtools.artifactregistry.v1.TagName;
import java.io.IOException;

public class GetTag {

  public static void main(String[] args) throws IOException {
    String projectId = "example-project-id";
    String locationId = "us-central1";
    String repositoryId = "example-repository-id";
    String packageId = "example-package-id";
    String tagId = "example-tag-id";
    getTag(projectId, locationId, repositoryId, packageId, tagId);
  }

  public static void getTag(
      String projectId, String locationId, String repositoryId, String packageId, String tagId)
      throws IOException {
    try (ArtifactRegistryClient client = ArtifactRegistryClient.create()) {
      String name = TagName.of(projectId, locationId, repositoryId, packageId, tagId).toString();
      GetTagRequest request = GetTagRequest.newBuilder().setName(name).build();

      Tag response = client.getTag(request);

      System.out.println("Retrieved tag: " + response.getName());
      System.out.println("Target version: " + response.getVersion());
    }
  }
}
// [END artifactregistry_v1_artifactregistry_tag_get]
