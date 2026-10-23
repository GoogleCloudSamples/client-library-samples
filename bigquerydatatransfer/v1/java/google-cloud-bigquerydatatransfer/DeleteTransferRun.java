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

// [START bigquerydatatransfer_v1_datatransferservice_transferrun_delete]
// [START bigquerydatatransfer_datatransferservice_transferrun_delete]
import com.google.api.gax.rpc.ApiException;
import com.google.api.gax.rpc.NotFoundException;
import com.google.cloud.bigquery.datatransfer.v1.DataTransferServiceClient;
import com.google.cloud.bigquery.datatransfer.v1.RunName;
import java.io.IOException;

public class DeleteTransferRun {

  /**
   * Deletes a transfer run.
   *
   * @param projectId The Google Cloud project ID (for example, "example-project-id").
   * @param location The geographic location of the transfer run (for example, "us-central1").
   * @param transferConfigId The transfer configuration ID (for example,
   *     "1234a-5678-90b1-2c3d-4e5f67890g12").
   * @param runId The transfer run ID (for example, "6789b-0123-45c6-7d8e-9f0a12345b67").
   */
  public static void deleteTransferRun(
      String projectId, String location, String transferConfigId, String runId) {
    RunName runName =
        RunName.ofProjectLocationTransferConfigRunName(
            projectId, location, transferConfigId, runId);

    try (DataTransferServiceClient client = DataTransferServiceClient.create()) {
      client.deleteTransferRun(runName);
      System.out.printf("Deleted transfer run %s%n", runName);
    } catch (NotFoundException err) {
      System.err.printf("error: transfer run '%s' not found: %s%n", runName, err.getMessage());
    } catch (ApiException | IOException err) {
      System.err.printf(
          "error: failed to delete transfer run '%s': %s%n", runName, err.getMessage());
    }
  }

  // [END bigquerydatatransfer_datatransferservice_transferrun_delete]
  // [END bigquerydatatransfer_v1_datatransferservice_transferrun_delete]

  public static void main(String[] args) {
    String projectId = System.getenv("GOOGLE_CLOUD_PROJECT");
    if (args.length > 0) {
      projectId = args[0];
    }
    if (projectId == null || projectId.isEmpty()) {
      projectId = "example-project-id";
    }

    String location = "us-central1";
    if (args.length > 1) {
      location = args[1];
    }

    String transferConfigId = System.getenv("TRANSFER_CONFIG_ID");
    if (args.length > 2) {
      transferConfigId = args[2];
    }
    if (transferConfigId == null || transferConfigId.isEmpty()) {
      transferConfigId = "example_transfer_config_id";
    }

    String runId = System.getenv("RUN_ID");
    if (args.length > 3) {
      runId = args[3];
    }
    if (runId == null || runId.isEmpty()) {
      runId = "example_run_id";
    }

    deleteTransferRun(projectId, location, transferConfigId, runId);
  }
}
