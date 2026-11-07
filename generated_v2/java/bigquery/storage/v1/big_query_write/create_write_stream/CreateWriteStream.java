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

// [START bigquerystorage_v1_bigquerywrite_writestream_create]
import com.google.cloud.bigquery.storage.v1.BigQueryWriteClient;
import com.google.cloud.bigquery.storage.v1.TableName;
import com.google.cloud.bigquery.storage.v1.WriteStream;
import java.io.IOException;

public class CreateWriteStream {

  public static void main(String[] args) throws IOException {
    String projectId = "example-project-id";
    String datasetId = "example-dataset-id";
    String tableId = "example-table-id";
    createWriteStream(projectId, datasetId, tableId);
  }

  public static void createWriteStream(String projectId, String datasetId, String tableId)
      throws IOException {
    try (BigQueryWriteClient client = BigQueryWriteClient.create()) {
      String parent = TableName.of(projectId, datasetId, tableId).toString();
      WriteStream writeStream =
          WriteStream.newBuilder().setType(WriteStream.Type.COMMITTED).build();

      WriteStream response = client.createWriteStream(parent, writeStream);
      System.out.println("Created write stream: " + response.getName());
    }
  }
}
// [END bigquerystorage_v1_bigquerywrite_writestream_create]
