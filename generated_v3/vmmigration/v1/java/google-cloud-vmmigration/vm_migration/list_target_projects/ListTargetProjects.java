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

package com.google.cloud.vmmigration.v1;

// [START vmmigration_v1_vmmigration_targetprojects_list]
import com.google.cloud.vmmigration.v1.LocationName;
import com.google.cloud.vmmigration.v1.TargetProject;
import com.google.cloud.vmmigration.v1.VmMigrationClient;

public class ListTargetProjects {

  public static void main(String[] args) throws Exception {
    String projectId = "example-project-id";
    // TargetProject is a global resource; locationId must be set to "global".
    String locationId = "global";
    listTargetProjects(projectId, locationId);
  }

  public static void listTargetProjects(String projectId, String locationId) throws Exception {
    try (VmMigrationClient client = VmMigrationClient.create()) {
      String parent = LocationName.of(projectId, locationId).toString();

      for (TargetProject targetProject : client.listTargetProjects(parent).iterateAll()) {
        System.out.printf("Target Project Name: %s%n", targetProject.getName());
        System.out.printf("Target Project Resource: %s%n", targetProject.getProject());
      }
    }
  }
}
// [END vmmigration_v1_vmmigration_targetprojects_list]
