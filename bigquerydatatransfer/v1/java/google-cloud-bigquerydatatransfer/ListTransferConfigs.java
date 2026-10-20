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

// [START bigquerydatatransfer_v1_datatransferservice_transferconfigs_list]
// [START bigquerydatatransfer_datatransferservice_transferconfigs_list]
// [START bigquerydatatransfer_list_configs]
import com.google.api.gax.rpc.ApiException;
import com.google.api.gax.rpc.NotFoundException;
import com.google.api.gax.rpc.PermissionDeniedException;
import com.google.cloud.bigquery.datatransfer.v1.DataTransferServiceClient;
import com.google.cloud.bigquery.datatransfer.v1.LocationName;
import com.google.cloud.bigquery.datatransfer.v1.TransferConfig;
import java.io.IOException;

public class ListTransferConfigs {

  /**
   * Lists transfer configurations in a given project and location.
   *
   * @param projectId The Google Cloud project ID (for example, "example-project-id").
   * @param location The geographic location of the transfer configs (for example, "us-central1").
   */
  public static void listTransferConfigs(String projectId, String location) {
    LocationName parent = LocationName.of(projectId, location);

    try (DataTransferServiceClient client = DataTransferServiceClient.create()) {
      for (TransferConfig config : client.listTransferConfigs(parent).iterateAll()) {
        System.out.printf("Name: %s%n", config.getName());
        System.out.printf("Display Name: %s%n", config.getDisplayName());
        System.out.printf("Data source: %s%n", config.getDataSourceId());
        System.out.printf("Destination dataset: %s%n", config.getDestinationDatasetId());
        if (config.hasScheduleOptionsV2()
            && config.getScheduleOptionsV2().hasTimeBasedSchedule()) {
          System.out.printf(
              "Schedule: %s%n", config.getScheduleOptionsV2().getTimeBasedSchedule().getSchedule());
        } else {
          System.out.println("Schedule: None");
        }
        System.out.println("---");
      }
    } catch (NotFoundException err) {
      System.err.printf("error: project '%s' not found: %s%n", projectId, err.getMessage());
    } catch (PermissionDeniedException err) {
      System.err.printf(
          "error: permission denied for project '%s': %s%n", projectId, err.getMessage());
    } catch (ApiException | IOException err) {
      System.err.printf(
          "error: failed to list transfer configs in '%s': %s%n", parent, err.getMessage());
    }
  }

  // [END bigquerydatatransfer_list_configs]
  // [END bigquerydatatransfer_datatransferservice_transferconfigs_list]
  // [END bigquerydatatransfer_v1_datatransferservice_transferconfigs_list]

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

    listTransferConfigs(projectId, location);
  }
}
