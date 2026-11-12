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

package com.google.cloud.cloudresourcemanager.v3;

// [START cloudresourcemanager_v3_projects_project_get]
import com.google.cloud.resourcemanager.v3.Project;
import com.google.cloud.resourcemanager.v3.ProjectsClient;
import java.io.IOException;

public class GetProject {

  public static void main(String[] args) throws IOException {
    String projectId = "example-project-id";
    getProject(projectId);
  }

  public static void getProject(String projectId) throws IOException {
    try (ProjectsClient client = ProjectsClient.create()) {
      String name = String.format("projects/%s", projectId);
      Project project = client.getProject(name);

      System.out.println("Project ID: " + project.getProjectId());
      System.out.println("Project display name: " + project.getDisplayName());
      System.out.println("Project state: " + project.getState());
    }
  }
}
// [END cloudresourcemanager_v3_projects_project_get]
