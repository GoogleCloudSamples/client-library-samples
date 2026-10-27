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

// [START bigquerystorage_v1_bigqueryread_readsession_create]
// [START bigquerystorage_bigqueryread_readsession_create]
import com.google.api.gax.rpc.ApiException;
import com.google.api.gax.rpc.NotFoundException;
import com.google.cloud.bigquery.storage.v1.BigQueryReadClient;
import com.google.cloud.bigquery.storage.v1.CreateReadSessionRequest;
import com.google.cloud.bigquery.storage.v1.DataFormat;
import com.google.cloud.bigquery.storage.v1.ProjectName;
import com.google.cloud.bigquery.storage.v1.ReadSession;
import com.google.cloud.bigquery.storage.v1.ReadSession.TableReadOptions;
import com.google.cloud.bigquery.storage.v1.TableName;
import java.io.IOException;

public class CreateReadSession {

  /**
   * Creates a BigQuery Storage read session for a specified table, projecting selected columns and
   * applying an optional row filter.
   *
   * @param projectId The Google Cloud project ID (for example, "example-project-id").
   * @param datasetId The BigQuery dataset ID containing the table (for example,
   *     "example_dataset").
   * @param tableId The BigQuery table ID to read from (for example, "example_table").
   */
  public static void createReadSession(String projectId, String datasetId, String tableId) {
    ProjectName parent = ProjectName.of(projectId);
    TableName table = TableName.of(projectId, datasetId, tableId);

    // If no fields are specified, all fields will be returned.
    TableReadOptions readOptions =
        TableReadOptions.newBuilder()
            .addSelectedFields("field_01")
            .addSelectedFields("field_02")
            .setRowRestriction("field_03 > 100")
            .build();

    ReadSession readSession =
        ReadSession.newBuilder()
            .setTable(table.toString())
            .setDataFormat(DataFormat.ARROW)
            .setReadOptions(readOptions)
            .build();

    CreateReadSessionRequest request =
        CreateReadSessionRequest.newBuilder()
            .setParent(parent.toString())
            .setReadSession(readSession)
            .setMaxStreamCount(1)
            .build();

    try (BigQueryReadClient client = BigQueryReadClient.create()) {
      ReadSession session = client.createReadSession(request);
      System.out.printf("Successfully created read session: %s%n", session.getName());
      if (session.getStreamsCount() > 0) {
        System.out.printf("Stream found: %s%n", session.getStreams(0).getName());
      } else {
        System.out.println("No streams found in the session.");
      }
    } catch (NotFoundException err) {
      System.err.printf(
          "error: table '%s' not found: %s%n", table, err.getMessage());
    } catch (ApiException | IOException err) {
      System.err.printf(
          "error: failed to create read session for table '%s': %s%n", table, err.getMessage());
    }
  }

  // [END bigquerystorage_bigqueryread_readsession_create]
  // [END bigquerystorage_v1_bigqueryread_readsession_create]

  public static void main(String[] args) {
    String projectId = System.getenv("GOOGLE_CLOUD_PROJECT");
    String datasetId = System.getenv("DATASET_ID");
    String tableId = System.getenv("TABLE_ID");

    if (args.length > 0) {
      projectId = args[0];
    }
    if (args.length > 1) {
      datasetId = args[1];
    }
    if (args.length > 2) {
      tableId = args[2];
    }

    if (projectId == null || projectId.isEmpty()) {
      projectId = "example-project-id";
    }
    if (datasetId == null || datasetId.isEmpty()) {
      datasetId = "example_dataset";
    }
    if (tableId == null || tableId.isEmpty()) {
      tableId = "example_table";
    }

    createReadSession(projectId, datasetId, tableId);
  }
}
