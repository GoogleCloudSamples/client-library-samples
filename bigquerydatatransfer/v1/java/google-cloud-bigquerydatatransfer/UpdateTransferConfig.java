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

// [START bigquerydatatransfer_v1_datatransferservice_transferconfig_update]
// [START bigquerydatatransfer_datatransferservice_transferconfig_update]
// [START bigquerydatatransfer_update_config]
import com.google.api.gax.rpc.ApiException;
import com.google.api.gax.rpc.NotFoundException;
import com.google.cloud.bigquery.datatransfer.v1.DataTransferServiceClient;
import com.google.cloud.bigquery.datatransfer.v1.TransferConfig;
import com.google.cloud.bigquery.datatransfer.v1.TransferConfigName;
import com.google.cloud.bigquery.datatransfer.v1.UpdateTransferConfigRequest;
import com.google.protobuf.FieldMask;
import java.io.IOException;

public class UpdateTransferConfig {

  /**
   * Updates the display name for a data transfer configuration.
   *
   * @param projectId The Google Cloud project ID (for example, "example-project-id").
   * @param location The geographic location of the transfer config (for example, "us-central1").
   * @param transferConfigId The transfer configuration ID (for example,
   *     "1234a-5678-90b1-2c3d-4e5f67890g12").
   */
  public static void updateTransferConfig(
      String projectId, String location, String transferConfigId) {
    TransferConfigName transferConfigName =
        TransferConfigName.ofProjectLocationTransferConfigName(
            projectId, location, transferConfigId);

    TransferConfig transferConfig =
        TransferConfig.newBuilder()
            .setName(transferConfigName.toString())
            .setDisplayName("Example Updated Transfer Config Display Name")
            .build();

    FieldMask updateMask = FieldMask.newBuilder().addPaths("display_name").build();

    UpdateTransferConfigRequest request =
        UpdateTransferConfigRequest.newBuilder()
            .setTransferConfig(transferConfig)
            .setUpdateMask(updateMask)
            .build();

    try (DataTransferServiceClient client = DataTransferServiceClient.create()) {
      TransferConfig response = client.updateTransferConfig(request);

      System.out.printf("Updated transfer config: %s%n", response.getName());
      System.out.printf("New display name: %s%n", response.getDisplayName());
    } catch (NotFoundException err) {
      System.err.printf(
          "error: transfer config '%s' not found: %s%n", transferConfigName, err.getMessage());
    } catch (ApiException | IOException err) {
      System.err.printf(
          "error: failed to update transfer config '%s': %s%n",
          transferConfigName, err.getMessage());
    }
  }

  // [END bigquerydatatransfer_update_config]
  // [END bigquerydatatransfer_datatransferservice_transferconfig_update]
  // [END bigquerydatatransfer_v1_datatransferservice_transferconfig_update]

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

    updateTransferConfig(projectId, location, transferConfigId);
  }
}
