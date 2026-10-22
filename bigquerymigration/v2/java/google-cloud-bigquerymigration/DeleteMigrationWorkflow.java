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

// [START bigquerymigration_v2_migrationservice_migrationworkflow_delete]
// [START bigquerymigration_migrationservice_migrationworkflow_delete]

import com.google.api.gax.rpc.ApiException;
import com.google.api.gax.rpc.NotFoundException;
import com.google.cloud.bigquery.migration.v2.DeleteMigrationWorkflowRequest;
import com.google.cloud.bigquery.migration.v2.MigrationServiceClient;
import com.google.cloud.bigquery.migration.v2.MigrationWorkflowName;
import java.io.IOException;

public class DeleteMigrationWorkflow {

  /**
   * Deletes a migration workflow by name.
   *
   * <p>The migration workflow is a top-level resource that contains all details about a migration.
   * Deleting the workflow also deletes all of its sub-resources, such as migration tasks.
   *
   * @param projectId the Google Cloud project ID (for example, {@code "example-project-id"})
   * @param location the geographic location of the migration workflow (for example, {@code "us"})
   * @param workflowId the ID of the migration workflow to delete (for example, {@code
   *     "12345678-abcd-4372-a567-0e02b2c3d479"})
   * @throws IOException if the client fails to initialize
   */
  public static void deleteMigrationWorkflow(String projectId, String location, String workflowId)
      throws IOException {
    MigrationWorkflowName name = MigrationWorkflowName.of(projectId, location, workflowId);

    try (MigrationServiceClient client = MigrationServiceClient.create()) {
      DeleteMigrationWorkflowRequest request =
          DeleteMigrationWorkflowRequest.newBuilder().setName(name.toString()).build();

      client.deleteMigrationWorkflow(request);
      System.out.printf("Deleted migration workflow: %s%n", name);
    } catch (NotFoundException e) {
      System.out.printf("Migration workflow not found: %s%n", name);
    } catch (ApiException e) {
      System.err.printf(
          "error: failed to delete migration workflow '%s' (status=%s): %s%n",
          name, e.getStatusCode().getCode(), e.getMessage());
    }
  }
  // [END bigquerymigration_migrationservice_migrationworkflow_delete]
  // [END bigquerymigration_v2_migrationservice_migrationworkflow_delete]

  // Entrypoint for command-line execution and automated validation using Terraform fixtures.
  public static void main(String[] args) throws Exception {
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

    deleteMigrationWorkflow(projectId, location, workflowId);
  }
}
