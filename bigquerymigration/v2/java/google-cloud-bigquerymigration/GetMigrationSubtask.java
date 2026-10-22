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

// [START bigquerymigration_v2_migrationservice_migrationsubtask_get]
// [START bigquerymigration_migrationservice_migrationsubtask_get]
import com.google.api.gax.rpc.ApiException;
import com.google.api.gax.rpc.NotFoundException;
import com.google.cloud.bigquery.migration.v2.GetMigrationSubtaskRequest;
import com.google.cloud.bigquery.migration.v2.MigrationServiceClient;
import com.google.cloud.bigquery.migration.v2.MigrationSubtask;
import com.google.cloud.bigquery.migration.v2.MigrationSubtaskName;
import java.io.IOException;

public class GetMigrationSubtask {

  /**
   * Gets a previously created migration subtask. A migration subtask is a single unit of work that
   * is part of a migration workflow.
   *
   * @param projectId The Google Cloud project ID (for example, "example-project-id").
   * @param location The geographic location of the migration workflow (for example, "us").
   * @param workflowId The ID of the migration workflow that contains the subtask (for example,
   *     "12345678-abcd-4372-a567-0e02b2c3d479").
   * @param subtaskId The ID of the migration subtask to retrieve (for example,
   *     "98765432-dcba-4370-971e-7ff74afce823").
   */
  public static void getMigrationSubtask(
      String projectId, String location, String workflowId, String subtaskId) {
    MigrationSubtaskName name =
        MigrationSubtaskName.of(projectId, location, workflowId, subtaskId);

    GetMigrationSubtaskRequest request =
        GetMigrationSubtaskRequest.newBuilder().setName(name.toString()).build();

    try (MigrationServiceClient client = MigrationServiceClient.create()) {
      MigrationSubtask subtask = client.getMigrationSubtask(request);
      System.out.printf("Migration subtask found: %s%n", subtask.getName());
      System.out.printf("  Type: %s%n", subtask.getType());
      System.out.printf("  State: %s%n", subtask.getState());
    } catch (NotFoundException err) {
      System.out.printf("Migration subtask not found: %s%n", name);
    } catch (ApiException | IOException err) {
      System.err.printf(
          "error: failed to get migration subtask '%s': %s%n", name, err.getMessage());
    }
  }

  // [END bigquerymigration_migrationservice_migrationsubtask_get]
  // [END bigquerymigration_v2_migrationservice_migrationsubtask_get]

  public static void main(String[] args) {
    String projectId = System.getenv("GOOGLE_CLOUD_PROJECT");
    String location = "us";
    String workflowId = System.getenv("WORKFLOW_ID");
    String subtaskId = System.getenv("SUBTASK_ID");

    if (args.length > 0) {
      projectId = args[0];
    }
    if (args.length > 1) {
      location = args[1];
    }
    if (args.length > 2) {
      workflowId = args[2];
    }
    if (args.length > 3) {
      subtaskId = args[3];
    }

    if (projectId == null || projectId.isEmpty()) {
      projectId = "example-project-id";
    }
    if (workflowId == null || workflowId.isEmpty()) {
      workflowId = "12345678-abcd-4372-a567-0e02b2c3d479";
    }
    if (subtaskId == null || subtaskId.isEmpty()) {
      subtaskId = "98765432-dcba-4370-971e-7ff74afce823";
    }

    getMigrationSubtask(projectId, location, workflowId, subtaskId);
  }
}
