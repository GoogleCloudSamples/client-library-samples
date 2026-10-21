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

// [START bigquerydatatransfer_v1_datatransferservice_transferconfig_get]
// [START bigquerydatatransfer_datatransferservice_transferconfig_get]
// [START bigquerydatatransfer_get_config_info]
import com.google.api.gax.rpc.ApiException;
import com.google.api.gax.rpc.NotFoundException;
import com.google.cloud.bigquery.datatransfer.v1.DataTransferServiceClient;
import com.google.cloud.bigquery.datatransfer.v1.TransferConfig;
import com.google.cloud.bigquery.datatransfer.v1.TransferConfigName;
import java.io.IOException;

public class GetTransferConfig {

  /**
   * Retrieves information about a data transfer configuration.
   *
   * @param projectId The Google Cloud project ID (for example, "example-project-id").
   * @param location The geographic location of the transfer config (for example, "us-central1").
   * @param transferConfigId The transfer configuration ID (for example,
   *     "1234a-5678-90b1-2c3d-4e5f67890g12").
   */
  public static void getTransferConfig(
      String projectId, String location, String transferConfigId) {
    TransferConfigName transferConfigName =
        TransferConfigName.ofProjectLocationTransferConfigName(
            projectId, location, transferConfigId);

    try (DataTransferServiceClient client = DataTransferServiceClient.create()) {
      TransferConfig transferConfig = client.getTransferConfig(transferConfigName);

      System.out.printf("Got transfer config: %s%n", transferConfig.getName());
      System.out.printf("Display name: %s%n", transferConfig.getDisplayName());
      System.out.printf("Destination dataset: %s%n", transferConfig.getDestinationDatasetId());
      System.out.printf("Data source: %s%n", transferConfig.getDataSourceId());
      if (transferConfig.hasScheduleOptionsV2()
          && transferConfig.getScheduleOptionsV2().hasTimeBasedSchedule()) {
        System.out.printf(
            "Schedule: %s%n",
            transferConfig.getScheduleOptionsV2().getTimeBasedSchedule().getSchedule());
      } else if (!transferConfig.getSchedule().isEmpty()) {
        System.out.printf("Schedule: %s%n", transferConfig.getSchedule());
      } else {
        System.out.println("Schedule: None");
      }
    } catch (NotFoundException err) {
      System.err.printf(
          "error: transfer config '%s' not found: %s%n", transferConfigName, err.getMessage());
    } catch (ApiException | IOException err) {
      System.err.printf(
          "error: failed to get transfer config '%s': %s%n", transferConfigName, err.getMessage());
    }
  }

  // [END bigquerydatatransfer_get_config_info]
  // [END bigquerydatatransfer_datatransferservice_transferconfig_get]
  // [END bigquerydatatransfer_v1_datatransferservice_transferconfig_get]

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

    getTransferConfig(projectId, location, transferConfigId);
  }
}
