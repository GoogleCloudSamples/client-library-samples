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

// [START bigquerydatatransfer_v1_datatransferservice_transferruns_list]
// [START bigquerydatatransfer_datatransferservice_transferruns_list]
// [START bigquerydatatransfer_get_run_history]
import com.google.api.gax.rpc.ApiException;
import com.google.api.gax.rpc.NotFoundException;
import com.google.cloud.bigquery.datatransfer.v1.DataTransferServiceClient;
import com.google.cloud.bigquery.datatransfer.v1.ListTransferRunsRequest;
import com.google.cloud.bigquery.datatransfer.v1.TransferConfigName;
import com.google.cloud.bigquery.datatransfer.v1.TransferRun;
import java.io.IOException;

public class ListTransferRuns {

  /**
   * Lists transfer runs for a given transfer configuration.
   *
   * @param projectId The Google Cloud project ID (for example, "example-project-id").
   * @param transferConfigId The data transfer configuration ID (for example,
   *     "1234a-5678-90b1-2c3d-4e5f67890g12").
   * @param location The geographic location of the transfer configuration (for example,
   *     "us-central1").
   */
  public static void listTransferRuns(
      String projectId, String transferConfigId, String location) {
    TransferConfigName parent =
        TransferConfigName.ofProjectLocationTransferConfigName(
            projectId, location, transferConfigId);
    ListTransferRunsRequest request =
        ListTransferRunsRequest.newBuilder().setParent(parent.toString()).build();

    try (DataTransferServiceClient client = DataTransferServiceClient.create()) {
      System.out.printf("Transfer runs for %s:%n", parent);
      for (TransferRun run : client.listTransferRuns(request).iterateAll()) {
        System.out.printf("  Run: %s, State: %s%n", run.getName(), run.getState());
      }
    } catch (NotFoundException err) {
      System.err.printf(
          "error: transfer configuration '%s' not found: %s%n", parent, err.getMessage());
    } catch (ApiException | IOException err) {
      System.err.printf(
          "error: failed to list transfer runs for '%s': %s%n", parent, err.getMessage());
    }
  }

  // [END bigquerydatatransfer_get_run_history]
  // [END bigquerydatatransfer_datatransferservice_transferruns_list]
  // [END bigquerydatatransfer_v1_datatransferservice_transferruns_list]

  public static void main(String[] args) {
    String projectId = System.getenv("GOOGLE_CLOUD_PROJECT");
    if (args.length > 0) {
      projectId = args[0];
    }
    if (projectId == null || projectId.isEmpty()) {
      projectId = "example-project-id";
    }

    String transferConfigId = System.getenv("TRANSFER_CONFIG_ID");
    if (args.length > 1) {
      transferConfigId = args[1];
    }
    if (transferConfigId == null || transferConfigId.isEmpty()) {
      transferConfigId = "example_transfer_config_id";
    }

    String location = "us-central1";
    if (args.length > 2) {
      location = args[2];
    }

    listTransferRuns(projectId, transferConfigId, location);
  }
}
