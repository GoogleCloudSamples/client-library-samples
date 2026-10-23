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

// [START bigquerydatatransfer_v1_datatransferservice_datasource_get]
// [START bigquerydatatransfer_datatransferservice_datasource_get]
import com.google.api.gax.rpc.ApiException;
import com.google.api.gax.rpc.NotFoundException;
import com.google.cloud.bigquery.datatransfer.v1.DataSource;
import com.google.cloud.bigquery.datatransfer.v1.DataSourceName;
import com.google.cloud.bigquery.datatransfer.v1.DataTransferServiceClient;
import java.io.IOException;

public class GetDataSource {

  /**
   * Retrieves a data source definition by name.
   *
   * @param projectId The Google Cloud project ID (for example, "example-project-id").
   * @param dataSourceId The data source ID (for example, "google_cloud_storage").
   */
  public static void getDataSource(String projectId, String dataSourceId) {
    DataSourceName name = DataSourceName.ofProjectDataSourceName(projectId, dataSourceId);

    try (DataTransferServiceClient client = DataTransferServiceClient.create()) {
      DataSource response = client.getDataSource(name);

      System.out.printf("Retrieved data source: %s%n", response.getName());
      System.out.printf("Display Name: %s%n", response.getDisplayName());
      System.out.printf("Description: %s%n", response.getDescription());
      System.out.printf("Client ID: %s%n", response.getClientId());
      System.out.printf("Supports custom schedule: %s%n", response.getSupportsCustomSchedule());
    } catch (NotFoundException err) {
      System.err.printf("error: data source '%s' not found: %s%n", name, err.getMessage());
    } catch (ApiException | IOException err) {
      System.err.printf("error: failed to get data source '%s': %s%n", name, err.getMessage());
    }
  }

  // [END bigquerydatatransfer_datatransferservice_datasource_get]
  // [END bigquerydatatransfer_v1_datatransferservice_datasource_get]

  public static void main(String[] args) {
    String projectId = System.getenv("GOOGLE_CLOUD_PROJECT");
    if (args.length > 0) {
      projectId = args[0];
    }
    if (projectId == null || projectId.isEmpty()) {
      projectId = "example-project-id";
    }

    String dataSourceId = "google_cloud_storage";
    if (args.length > 1) {
      dataSourceId = args[1];
    }

    getDataSource(projectId, dataSourceId);
  }
}
