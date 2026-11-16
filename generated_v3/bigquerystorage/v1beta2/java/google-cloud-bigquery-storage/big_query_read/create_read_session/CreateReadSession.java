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

package com.google.cloud.analyticshub.v1beta2;

// [START analyticshub_v1beta2_bigqueryread_readsession_create]
import com.google.cloud.bigquery.storage.v1beta2.BigQueryReadClient;
import com.google.cloud.bigquery.storage.v1beta2.DataFormat;
import com.google.cloud.bigquery.storage.v1beta2.ReadSession;
import java.io.IOException;

public class CreateReadSession {

  public static void createReadSession(String projectId) throws IOException {
    // Initialize a client that sends requests. Create once and reuse across requests.
    try (BigQueryReadClient client = BigQueryReadClient.create()) {
      String parent = String.format("projects/%s", projectId);
      ReadSession readSession =
          ReadSession.newBuilder()
              .setTable(
                  String.format(
                      "projects/%s/datasets/example_dataset/tables/example_table", projectId))
              .setDataFormat(DataFormat.AVRO)
              .build();
      int maxStreamCount = 1;

      ReadSession response = client.createReadSession(parent, readSession, maxStreamCount);
      System.out.println("Read session created: " + response.getName());
    }
  }
}
// [END analyticshub_v1beta2_bigqueryread_readsession_create]
