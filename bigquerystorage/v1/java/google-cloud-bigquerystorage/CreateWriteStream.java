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

// [START bigquerystorage_v1_bigquerywrite_writestream_create]
// [START bigquerystorage_bigquerywrite_writestream_create]
import com.google.api.gax.rpc.ApiException;
import com.google.api.gax.rpc.NotFoundException;
import com.google.cloud.bigquery.storage.v1.BigQueryWriteClient;
import com.google.cloud.bigquery.storage.v1.CreateWriteStreamRequest;
import com.google.cloud.bigquery.storage.v1.TableName;
import com.google.cloud.bigquery.storage.v1.WriteStream;
import java.io.IOException;

public class CreateWriteStream {

  /**
   * Creates a BigQuery Storage write stream for appending rows to a specified table.
   *
   * @param projectId The Google Cloud project ID (for example, "example-project-id").
   * @param datasetId The BigQuery dataset ID containing the table (for example,
   *     "example_dataset").
   * @param tableId The BigQuery table ID to create the write stream for (for example,
   *     "example_table").
   */
  public static void createWriteStream(String projectId, String datasetId, String tableId) {
    TableName parent = TableName.of(projectId, datasetId, tableId);

    WriteStream writeStream =
        WriteStream.newBuilder().setType(WriteStream.Type.COMMITTED).build();

    CreateWriteStreamRequest request =
        CreateWriteStreamRequest.newBuilder()
            .setParent(parent.toString())
            .setWriteStream(writeStream)
            .build();

    try (BigQueryWriteClient client = BigQueryWriteClient.create()) {
      WriteStream createdStream = client.createWriteStream(request);
      System.out.printf("Created write stream: %s%n", createdStream.getName());
      System.out.printf("Stream type: %s%n", createdStream.getType());
    } catch (NotFoundException err) {
      System.err.printf(
          "error: parent table '%s' not found: %s%n", parent, err.getMessage());
    } catch (ApiException | IOException err) {
      System.err.printf(
          "error: failed to create write stream for table '%s': %s%n", parent, err.getMessage());
    }
  }

  // [END bigquerystorage_bigquerywrite_writestream_create]
  // [END bigquerystorage_v1_bigquerywrite_writestream_create]

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

    createWriteStream(projectId, datasetId, tableId);
  }
}
