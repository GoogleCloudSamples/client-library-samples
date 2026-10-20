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

// [START bigquerydatatransfer_v1_datatransferservice_datasources_list]
// [START bigquerydatatransfer_datatransferservice_datasources_list]
// [START bigquerydatatransfer_quickstart]
import com.google.api.gax.rpc.ApiException;
import com.google.api.gax.rpc.NotFoundException;
import com.google.cloud.bigquery.datatransfer.v1.DataSource;
import com.google.cloud.bigquery.datatransfer.v1.DataTransferServiceClient;
import com.google.cloud.bigquery.datatransfer.v1.ListDataSourcesRequest;
import com.google.cloud.bigquery.datatransfer.v1.ProjectName;
import java.io.IOException;

public class ListDataSources {

  /**
   * Lists all available data sources for the BigQuery Data Transfer Service.
   *
   * @param projectId The Google Cloud project ID (for example, "example-project-id").
   */
  public static void listDataSources(String projectId) {
    ProjectName parent = ProjectName.of(projectId);
    ListDataSourcesRequest request =
        ListDataSourcesRequest.newBuilder().setParent(parent.toString()).build();

    try (DataTransferServiceClient client = DataTransferServiceClient.create()) {
      System.out.println("Data sources:");
      for (DataSource dataSource : client.listDataSources(request).iterateAll()) {
        System.out.printf("\tName: %s%n", dataSource.getName());
        System.out.printf("\tID: %s%n", dataSource.getDataSourceId());
        System.out.printf("\tDisplay Name: %s%n", dataSource.getDisplayName());
        System.out.printf("\tDescription: %s%n", dataSource.getDescription());
      }
    } catch (NotFoundException err) {
      System.err.printf("error: project '%s' not found: %s%n", projectId, err.getMessage());
    } catch (ApiException | IOException err) {
      System.err.printf(
          "error: failed to list data sources in project '%s': %s%n", projectId, err.getMessage());
    }
  }

  // [END bigquerydatatransfer_quickstart]
  // [END bigquerydatatransfer_datatransferservice_datasources_list]
  // [END bigquerydatatransfer_v1_datatransferservice_datasources_list]

  public static void main(String[] args) {
    String projectId = System.getenv("GOOGLE_CLOUD_PROJECT");
    if (args.length > 0) {
      projectId = args[0];
    }
    if (projectId == null || projectId.isEmpty()) {
      projectId = "example-project-id";
    }

    listDataSources(projectId);
  }
}
