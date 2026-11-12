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

// [START cloudresourcemanager_v3_projects_project_update]
package com.google.cloud.cloudresourcemanager.v3;

import com.google.cloud.resourcemanager.v3.Project;
import com.google.cloud.resourcemanager.v3.ProjectsClient;
import com.google.protobuf.FieldMask;
import java.io.IOException;
import java.util.concurrent.ExecutionException;
import java.util.concurrent.TimeUnit;
import java.util.concurrent.TimeoutException;

public class UpdateProject {

  public static void main(String[] args)
      throws IOException, ExecutionException, InterruptedException, TimeoutException {
    String projectId = "example-project-id";
    updateProject(projectId);
  }

  public static void updateProject(String projectId)
      throws IOException, ExecutionException, InterruptedException, TimeoutException {
    try (ProjectsClient client = ProjectsClient.create()) {
      Project project =
          Project.newBuilder()
              .setName("projects/" + projectId)
              .setDisplayName("Updated Sample Project")
              .build();
      FieldMask updateMask = FieldMask.newBuilder().addPaths("display_name").build();

      // UpdateProject is a long-running operation; wait for it to complete.
      Project updatedProject =
          client.updateProjectAsync(project, updateMask).get(5, TimeUnit.MINUTES);

      System.out.println("Updated Project: " + updatedProject.getName());
      System.out.println("Display Name: " + updatedProject.getDisplayName());
    }
  }
}
// [END cloudresourcemanager_v3_projects_project_update]
