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

// [START bigquerystorage_v1_bigquerywrite_writestream_get]
// [START bigquerystorage_bigquerywrite_writestream_get]
import com.google.api.gax.rpc.ApiException;
import com.google.api.gax.rpc.NotFoundException;
import com.google.cloud.bigquery.storage.v1.BigQueryWriteClient;
import com.google.cloud.bigquery.storage.v1.GetWriteStreamRequest;
import com.google.cloud.bigquery.storage.v1.WriteStream;
import com.google.cloud.bigquery.storage.v1.WriteStreamName;
import java.io.IOException;

public class GetWriteStream {

  /**
   * Retrieves information about a BigQuery Storage write stream.
   *
   * @param projectId The Google Cloud project ID (for example, "example-project-id").
   * @param datasetId The BigQuery dataset ID containing the table (for example,
   *     "example_dataset").
   * @param tableId The BigQuery table ID (for example, "example_table").
   */
  public static void getWriteStream(String projectId, String datasetId, String tableId) {
    // Every BigQuery table has a built-in "_default" write stream.
    String streamId = "_default";
    WriteStreamName name = WriteStreamName.of(projectId, datasetId, tableId, streamId);

    GetWriteStreamRequest request =
        GetWriteStreamRequest.newBuilder().setName(name.toString()).build();

    try (BigQueryWriteClient client = BigQueryWriteClient.create()) {
      WriteStream stream = client.getWriteStream(request);
      System.out.printf("Got write stream: %s%n", stream.getName());
      System.out.printf("Stream type: %s%n", stream.getType());
      System.out.printf("Stream location: %s%n", stream.getLocation());
    } catch (NotFoundException err) {
      System.err.printf(
          "error: write stream '%s' not found: %s%n", name, err.getMessage());
    } catch (ApiException | IOException err) {
      System.err.printf(
          "error: failed to get write stream '%s': %s%n", name, err.getMessage());
    }
  }

  // [END bigquerystorage_bigquerywrite_writestream_get]
  // [END bigquerystorage_v1_bigquerywrite_writestream_get]

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

    getWriteStream(projectId, datasetId, tableId);
  }
}
