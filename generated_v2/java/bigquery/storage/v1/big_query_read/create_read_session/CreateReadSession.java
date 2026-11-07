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

// [START bigquerystorage_v1_bigqueryread_readsession_create]
import com.google.cloud.bigquery.storage.v1.BigQueryReadClient;
import com.google.cloud.bigquery.storage.v1.DataFormat;
import com.google.cloud.bigquery.storage.v1.ReadSession;
import java.io.IOException;

public class CreateReadSession {

  public static void main(String[] args) throws IOException {
    String projectId = "example-project-id";
    String datasetId = "example-dataset-id";
    String tableId = "example-table-id";
    createReadSession(projectId, datasetId, tableId);
  }

  public static void createReadSession(String projectId, String datasetId, String tableId)
      throws IOException {
    try (BigQueryReadClient client = BigQueryReadClient.create()) {
      String parent = String.format("projects/%s", projectId);
      String table =
          String.format("projects/%s/datasets/%s/tables/%s", projectId, datasetId, tableId);
      ReadSession readSession =
          ReadSession.newBuilder()
              .setTable(table)
              .setDataFormat(DataFormat.AVRO)
              .build();

      // Configure a read session with a single data stream.
      ReadSession response = client.createReadSession(parent, readSession, 1);
      System.out.println("Read session created: " + response.getName());
    }
  }
}
// [END bigquerystorage_v1_bigqueryread_readsession_create]
