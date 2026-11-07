// Copyright 2026 Google LLC
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

package com.google.cloud.bigquerystorage.v1;

// [START bigquerystorage_v1_bigquerywrite_writestream_get]
import com.google.cloud.bigquery.storage.v1.BigQueryWriteClient;
import com.google.cloud.bigquery.storage.v1.GetWriteStreamRequest;
import com.google.cloud.bigquery.storage.v1.WriteStream;
import java.io.IOException;

public class GetWriteStream {

  public static void main(String[] args) throws IOException {
    String projectId = "example-project-id";
    String datasetId = "example-dataset-id";
    String tableId = "example-table-id";
    String streamId = "example-stream-id";
    getWriteStream(projectId, datasetId, tableId, streamId);
  }

  public static void getWriteStream(
      String projectId, String datasetId, String tableId, String streamId) throws IOException {
    try (BigQueryWriteClient client = BigQueryWriteClient.create()) {
      // Construct the write stream resource path
      String name =
          String.format(
              "projects/%s/datasets/%s/tables/%s/streams/%s",
              projectId, datasetId, tableId, streamId);

      GetWriteStreamRequest request =
          GetWriteStreamRequest.newBuilder()
              .setName(name)
              .build();

      WriteStream writeStream = client.getWriteStream(request);
      System.out.println("Write stream retrieved successfully: " + writeStream.getName());
      System.out.println("Stream type: " + writeStream.getType());
    }
  }
}
// [END bigquerystorage_v1_bigquerywrite_writestream_get]
