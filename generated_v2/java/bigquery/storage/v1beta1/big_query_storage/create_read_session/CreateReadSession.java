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

package com.google.cloud.bigquerystorage.v1beta1;

// [START bigquerystorage_v1beta1_bigquerystorage_readsession_create]
import com.google.cloud.bigquery.storage.v1beta1.BigQueryStorageClient;
import com.google.cloud.bigquery.storage.v1beta1.Storage.ReadSession;
import com.google.cloud.bigquery.storage.v1beta1.TableReferenceProto.TableReference;
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
    try (BigQueryStorageClient client = BigQueryStorageClient.create()) {
      TableReference tableReference =
          TableReference.newBuilder()
              .setProjectId(projectId)
              .setDatasetId(datasetId)
              .setTableId(tableId)
              .build();
      String parent = String.format("projects/%s", projectId);
      int requestedStreams = 1;

      ReadSession response = client.createReadSession(tableReference, parent, requestedStreams);
      System.out.println("Read session created: " + response.getName());
    }
  }
}
// [END bigquerystorage_v1beta1_bigquerystorage_readsession_create]
