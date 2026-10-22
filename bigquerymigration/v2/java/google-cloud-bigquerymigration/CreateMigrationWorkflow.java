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

// [START bigquerymigration_v2_migrationservice_migrationworkflow_create]
// [START bigquerymigration_migrationservice_migrationworkflow_create]

import com.google.api.gax.rpc.AlreadyExistsException;
import com.google.api.gax.rpc.ApiException;
import com.google.api.gax.rpc.InvalidArgumentException;
import com.google.cloud.bigquery.migration.v2.BigQueryDialect;
import com.google.cloud.bigquery.migration.v2.CreateMigrationWorkflowRequest;
import com.google.cloud.bigquery.migration.v2.Dialect;
import com.google.cloud.bigquery.migration.v2.LocationName;
import com.google.cloud.bigquery.migration.v2.MigrationServiceClient;
import com.google.cloud.bigquery.migration.v2.MigrationTask;
import com.google.cloud.bigquery.migration.v2.MigrationWorkflow;
import com.google.cloud.bigquery.migration.v2.TeradataDialect;
import com.google.cloud.bigquery.migration.v2.TranslationConfigDetails;
import java.io.IOException;
import java.util.Map;

public class CreateMigrationWorkflow {

  /**
   * Creates a Teradata SQL translation migration workflow.
   *
   * <p>Creates a migration workflow to batch translate Teradata SQL scripts and DDL into
   * BigQuery-compatible SQL. The translation task reads input files from a Cloud Storage source
   * path and writes the converted output to a Cloud Storage target path.
   *
   * @param projectId the Google Cloud project ID (for example, {@code "example-project-id"})
   * @param location the geographic location of the migration workflow (for example, {@code "us"})
   * @param gcsSourcePath the Cloud Storage path for a directory of files to translate in a batch
   *     (for example, {@code "gs://example-bucket/example-input-folder/"})
   * @param gcsTargetPath the Cloud Storage path to write back the translated output files to (for
   *     example, {@code "gs://example-bucket/example-output-folder/"})
   * @throws IOException if the client fails to initialize
   */
  public static void createMigrationWorkflow(
      String projectId, String location, String gcsSourcePath, String gcsTargetPath)
      throws IOException {
    try (MigrationServiceClient client = MigrationServiceClient.create()) {
      LocationName parent = LocationName.of(projectId, location);

      Dialect sourceDialect =
          Dialect.newBuilder()
              .setTeradataDialect(
                  TeradataDialect.newBuilder().setMode(TeradataDialect.Mode.SQL).build())
              .build();

      Dialect targetDialect =
          Dialect.newBuilder().setBigqueryDialect(BigQueryDialect.getDefaultInstance()).build();

      TranslationConfigDetails translationConfigDetails =
          TranslationConfigDetails.newBuilder()
              .setGcsSourcePath(gcsSourcePath)
              .setGcsTargetPath(gcsTargetPath)
              .setSourceDialect(sourceDialect)
              .setTargetDialect(targetDialect)
              .build();

      MigrationTask task =
          MigrationTask.newBuilder()
              .setType("Translation_Teradata2BQ")
              .setTranslationConfigDetails(translationConfigDetails)
              .build();

      MigrationWorkflow migrationWorkflow =
          MigrationWorkflow.newBuilder()
              .setDisplayName("Example Teradata to BigQuery Migration Workflow")
              .putTasks("translation-task", task)
              .build();

      CreateMigrationWorkflowRequest request =
          CreateMigrationWorkflowRequest.newBuilder()
              .setParent(parent.toString())
              .setMigrationWorkflow(migrationWorkflow)
              .build();

      MigrationWorkflow response = client.createMigrationWorkflow(request);
      System.out.printf("Created migration workflow: %s%n", response.getName());
      System.out.printf("  Display Name: %s%n", response.getDisplayName());
      System.out.printf("  State: %s%n", response.getState());
      System.out.println("  Tasks:");
      for (Map.Entry<String, MigrationTask> entry : response.getTasksMap().entrySet()) {
        MigrationTask createdTask = entry.getValue();
        System.out.printf("    - %s:%n", entry.getKey());
        System.out.printf("        Type: %s%n", createdTask.getType());
        System.out.printf("        State: %s%n", createdTask.getState());
      }
    } catch (AlreadyExistsException e) {
      System.out.printf("Migration workflow already exists: %s%n", e.getMessage());
    } catch (InvalidArgumentException e) {
      System.err.printf(
          "error: invalid argument provided for creating migration workflow (status=%s): %s%n",
          e.getStatusCode().getCode(), e.getMessage());
    } catch (ApiException e) {
      System.err.printf(
          "error: failed to create migration workflow (status=%s): %s%n",
          e.getStatusCode().getCode(), e.getMessage());
    }
  }
  // [END bigquerymigration_migrationservice_migrationworkflow_create]
  // [END bigquerymigration_v2_migrationservice_migrationworkflow_create]

  // Entrypoint for command-line execution and automated validation using Terraform fixtures.
  public static void main(String[] args) throws Exception {
    String projectId = System.getenv("GOOGLE_CLOUD_PROJECT");
    String location = "us";
    String gcsSourcePath = System.getenv("GCS_SOURCE_PATH");
    String gcsTargetPath = System.getenv("GCS_TARGET_PATH");

    if (args.length > 0) {
      projectId = args[0];
    }
    if (args.length > 1) {
      location = args[1];
    }
    if (args.length > 2) {
      gcsSourcePath = args[2];
    }
    if (args.length > 3) {
      gcsTargetPath = args[3];
    }

    if (projectId == null || projectId.isEmpty()) {
      projectId = "example-project-id";
    }
    if (gcsSourcePath == null || gcsSourcePath.isEmpty()) {
      gcsSourcePath = "gs://example-bucket/example-input-folder/";
    }
    if (gcsTargetPath == null || gcsTargetPath.isEmpty()) {
      gcsTargetPath = "gs://example-bucket/example-output-folder/";
    }

    createMigrationWorkflow(projectId, location, gcsSourcePath, gcsTargetPath);
  }
}
