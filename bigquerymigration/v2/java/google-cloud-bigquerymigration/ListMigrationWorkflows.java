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

// [START bigquerymigration_v2_migrationservice_migrationworkflows_list]
// [START bigquerymigration_migrationservice_migrationworkflows_list]
import com.google.api.gax.rpc.ApiException;
import com.google.api.gax.rpc.NotFoundException;
import com.google.cloud.bigquery.migration.v2.ListMigrationWorkflowsRequest;
import com.google.cloud.bigquery.migration.v2.LocationName;
import com.google.cloud.bigquery.migration.v2.MigrationServiceClient;
import com.google.cloud.bigquery.migration.v2.MigrationWorkflow;
import java.io.IOException;

public class ListMigrationWorkflows {

  /**
   * Lists migration workflows in a given project and location.
   *
   * @param projectId The Google Cloud project ID (for example, "example-project-id").
   * @param location The geographic location of the migration workflows (for example, "us").
   */
  public static void listMigrationWorkflows(String projectId, String location) {
    LocationName parent = LocationName.of(projectId, location);

    ListMigrationWorkflowsRequest request =
        ListMigrationWorkflowsRequest.newBuilder().setParent(parent.toString()).build();

    try (MigrationServiceClient client = MigrationServiceClient.create()) {
      System.out.printf("Workflows in parent '%s':%n", parent);
      int count = 0;
      for (MigrationWorkflow workflow : client.listMigrationWorkflows(request).iterateAll()) {
        System.out.printf("  %s%n", workflow.getName());
        System.out.printf("    Display Name: %s%n", workflow.getDisplayName());
        System.out.printf("    State: %s%n", workflow.getState());
        count++;
      }

      if (count == 0) {
        System.out.println("No migration workflows found.");
      }
    } catch (NotFoundException err) {
      System.out.printf("The parent resource '%s' was not found.%n", parent);
    } catch (ApiException | IOException err) {
      System.err.printf(
          "error: failed to list migration workflows in '%s': %s%n", parent, err.getMessage());
    }
  }

  // [END bigquerymigration_migrationservice_migrationworkflows_list]
  // [END bigquerymigration_v2_migrationservice_migrationworkflows_list]

  public static void main(String[] args) {
    String projectId = System.getenv("GOOGLE_CLOUD_PROJECT");
    String location = System.getenv("LOCATION");

    if (args.length > 0) {
      projectId = args[0];
    }
    if (args.length > 1) {
      location = args[1];
    }

    if (projectId == null || projectId.isEmpty()) {
      projectId = "example-project-id";
    }
    if (location == null || location.isEmpty()) {
      location = "us";
    }

    listMigrationWorkflows(projectId, location);
  }
}
