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

package com.google.cloud.bigquerymigration.v2;

// [START bigquerymigration_v2_migrationservice_migrationsubtask_get]
import com.google.cloud.bigquery.migration.v2.MigrationServiceClient;
import com.google.cloud.bigquery.migration.v2.MigrationSubtask;
import com.google.cloud.bigquery.migration.v2.MigrationSubtaskName;
import java.io.IOException;

public class GetMigrationSubtask {

  public static void main(String[] args) throws IOException {
    String projectId = "example-project-id";
    String locationId = "example-location-id";
    String workflowId = "example-workflow-id";
    String subtaskId = "example-subtask-id";
    getMigrationSubtask(projectId, locationId, workflowId, subtaskId);
  }

  public static void getMigrationSubtask(
      String projectId, String locationId, String workflowId, String subtaskId)
      throws IOException {
    // Initialize client that will be used to send requests. This client only needs to be created
    // once, and can be reused for multiple requests.
    try (MigrationServiceClient client = MigrationServiceClient.create()) {
      String name =
          MigrationSubtaskName.of(projectId, locationId, workflowId, subtaskId).toString();

      MigrationSubtask subtask = client.getMigrationSubtask(name);

      System.out.println("Successfully retrieved migration subtask: " + subtask.getName());
      System.out.println("Subtask state: " + subtask.getState());
      System.out.println("Subtask type: " + subtask.getType());
    }
  }
}
// [END bigquerymigration_v2_migrationservice_migrationsubtask_get]
