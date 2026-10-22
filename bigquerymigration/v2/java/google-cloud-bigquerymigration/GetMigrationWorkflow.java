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

// [START bigquerymigration_v2_migrationservice_migrationworkflow_get]
// [START bigquerymigration_migrationservice_migrationworkflow_get]
import com.google.api.gax.rpc.ApiException;
import com.google.api.gax.rpc.NotFoundException;
import com.google.cloud.bigquery.migration.v2.GetMigrationWorkflowRequest;
import com.google.cloud.bigquery.migration.v2.MigrationServiceClient;
import com.google.cloud.bigquery.migration.v2.MigrationWorkflow;
import com.google.cloud.bigquery.migration.v2.MigrationWorkflowName;
import java.io.IOException;

public class GetMigrationWorkflow {

  /**
   * Gets a previously created migration workflow. A migration workflow is a collection of tasks
   * that orchestrates a data warehouse migration to BigQuery.
   *
   * @param projectId The Google Cloud project ID (for example, "example-project-id").
   * @param location The geographic location of the migration workflow (for example, "us").
   * @param workflowId The ID of the migration workflow to retrieve (for example,
   *     "12345678-abcd-4372-a567-0e02b2c3d479").
   */
  public static void getMigrationWorkflow(String projectId, String location, String workflowId) {
    MigrationWorkflowName name = MigrationWorkflowName.of(projectId, location, workflowId);

    GetMigrationWorkflowRequest request =
        GetMigrationWorkflowRequest.newBuilder().setName(name.toString()).build();

    try (MigrationServiceClient client = MigrationServiceClient.create()) {
      MigrationWorkflow workflow = client.getMigrationWorkflow(request);
      System.out.printf("Migration workflow found: %s%n", workflow.getName());
      System.out.printf("  Display Name: %s%n", workflow.getDisplayName());
      System.out.printf("  State: %s%n", workflow.getState());
    } catch (NotFoundException err) {
      System.out.printf("Migration workflow not found: %s%n", name);
    } catch (ApiException | IOException err) {
      System.err.printf(
          "error: failed to get migration workflow '%s': %s%n", name, err.getMessage());
    }
  }

  // [END bigquerymigration_migrationservice_migrationworkflow_get]
  // [END bigquerymigration_v2_migrationservice_migrationworkflow_get]

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

    getMigrationWorkflow(projectId, location, workflowId);
  }
}
