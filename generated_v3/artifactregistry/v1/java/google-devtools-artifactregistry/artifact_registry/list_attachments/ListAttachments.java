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

// [START artifactregistry_v1_artifactregistry_attachments_list]
import com.google.devtools.artifactregistry.v1.ArtifactRegistryClient;
import com.google.devtools.artifactregistry.v1.Attachment;
import com.google.devtools.artifactregistry.v1.RepositoryName;
import java.io.IOException;

public class ListAttachments {

  public static void main(String[] args) throws IOException {
    String projectId = "example-project-id";
    String locationId = "example-location-id";
    String repositoryId = "example-repository-id";
    listAttachments(projectId, locationId, repositoryId);
  }

  public static void listAttachments(String projectId, String locationId, String repositoryId)
      throws IOException {
    // Initialize the client to send requests. Create once and reuse across requests.
    try (ArtifactRegistryClient client = ArtifactRegistryClient.create()) {
      String parent = RepositoryName.of(projectId, locationId, repositoryId).toString();

      for (Attachment attachment : client.listAttachments(parent).iterateAll()) {
        System.out.println("Attachment name: " + attachment.getName());
        System.out.println("Target: " + attachment.getTarget());
        System.out.println("Type: " + attachment.getType());
      }
    }
  }
}
// [END artifactregistry_v1_artifactregistry_attachments_list]
