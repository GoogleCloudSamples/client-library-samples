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

// [START artifactregistry_v1beta2_artifactregistry_projectsettings_get]
import com.google.devtools.artifactregistry.v1beta2.ArtifactRegistryClient;
import com.google.devtools.artifactregistry.v1beta2.ProjectSettings;
import java.io.IOException;

public class GetProjectSettings {

  public static void main(String[] args) throws IOException {
    String projectId = "example-project-id";
    getProjectSettings(projectId);
  }

  public static void getProjectSettings(String projectId) throws IOException {
    // Initialize the client once to send multiple requests.
    try (ArtifactRegistryClient client = ArtifactRegistryClient.create()) {
      String name = String.format("projects/%s/projectSettings", projectId);

      ProjectSettings response = client.getProjectSettings(name);

      System.out.println("Project settings retrieved: " + response.getName());
    }
  }
}
// [END artifactregistry_v1beta2_artifactregistry_projectsettings_get]
