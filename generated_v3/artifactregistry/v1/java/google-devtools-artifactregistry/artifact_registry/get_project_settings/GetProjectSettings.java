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

// [START artifactregistry_v1_artifactregistry_projectsettings_get]
import com.google.devtools.artifactregistry.v1.ArtifactRegistryClient;
import com.google.devtools.artifactregistry.v1.ProjectSettings;
import com.google.devtools.artifactregistry.v1.ProjectSettingsName;
import java.io.IOException;

public class GetProjectSettings {

  public static void main(String[] args) throws IOException {
    String projectId = "example-project-id";
    getProjectSettings(projectId);
  }

  public static void getProjectSettings(String projectId) throws IOException {
    try (ArtifactRegistryClient client = ArtifactRegistryClient.create()) {
      String name = ProjectSettingsName.of(projectId).toString();

      ProjectSettings settings = client.getProjectSettings(name);

      System.out.println("Project settings retrieved: " + settings.getName());
      System.out.println("Legacy redirection state: " + settings.getLegacyRedirectionState());
    }
  }
}
// [END artifactregistry_v1_artifactregistry_projectsettings_get]
