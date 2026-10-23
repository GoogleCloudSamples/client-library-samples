/*
 * Copyright 2026 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

// [START bigquerymigration_v2_migrationservice_migrationsubtasks_list]
// [START bigquerymigration_migrationservice_migrationsubtasks_list]
import com.google.api.gax.rpc.ApiException;
import com.google.api.gax.rpc.NotFoundException;
import com.google.cloud.bigquery.migration.v2.ListMigrationSubtasksRequest;
import com.google.cloud.bigquery.migration.v2.MigrationServiceClient;
import com.google.cloud.bigquery.migration.v2.MigrationSubtask;
import com.google.cloud.bigquery.migration.v2.MigrationWorkflowName;
import java.io.IOException;

public class ListMigrationSubtasks {

  /**
   * Lists migration subtasks for a given workflow.
   *
   * @param projectId The Google Cloud project ID (for example, "example-project-id").
   * @param location The geographic location of the migration workflow (for example, "us").
   * @param workflowId The ID of the migration workflow (for example,
   *     "12345678-abcd-4372-a567-0e02b2c3d479").
   */
  public static void listMigrationSubtasks(String projectId, String location, String workflowId) {
    MigrationWorkflowName parent = MigrationWorkflowName.of(projectId, location, workflowId);

    ListMigrationSubtasksRequest request =
        ListMigrationSubtasksRequest.newBuilder().setParent(parent.toString()).build();

    try (MigrationServiceClient client = MigrationServiceClient.create()) {
      System.out.printf("Subtasks for workflow '%s':%n", parent);
      int count = 0;
      for (MigrationSubtask subtask : client.listMigrationSubtasks(request).iterateAll()) {
        System.out.printf("  Subtask Name: %s%n", subtask.getName());
        System.out.printf("    Type: %s%n", subtask.getType());
        System.out.printf("    State: %s%n", subtask.getState());
        count++;
      }

      if (count == 0) {
        System.out.println("No migration subtasks found.");
      }
    } catch (NotFoundException err) {
      System.out.printf("Migration workflow not found: %s%n", parent);
    } catch (ApiException | IOException err) {
      System.err.printf(
          "error: failed to list migration subtasks for '%s': %s%n", parent, err.getMessage());
    }
  }

  // [END bigquerymigration_migrationservice_migrationsubtasks_list]
  // [END bigquerymigration_v2_migrationservice_migrationsubtasks_list]

  public static void main(String[] args) {
    String projectId = System.getenv("GOOGLE_CLOUD_PROJECT");
    String location = "us";
    String workflowId = System.getenv("WORKFLOW_ID");

    if (args.length > 0) {
      projectId = args[0];
    }
    if (args.length > 1) {
      location = args[1];
    }
    if (args.length > 2) {
      workflowId = args[2];
    }

    if (projectId == null || projectId.isEmpty()) {
      projectId = "example-project-id";
    }
    if (workflowId == null || workflowId.isEmpty()) {
      workflowId = "12345678-abcd-4372-a567-0e02b2c3d479";
    }

    listMigrationSubtasks(projectId, location, workflowId);
  }
}
