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

package com.google.cloud.datastore.v1;

// [START datastore_v1_datastoreadmin_index_get]
import com.google.cloud.datastore.admin.v1.DatastoreAdminClient;
import com.google.datastore.admin.v1.GetIndexRequest;
import com.google.datastore.admin.v1.Index;
import java.io.IOException;

public class GetIndex {

  public static void main(String[] args) throws IOException {
    String projectId = "example-project-id";
    String indexId = "example-index-id";
    getIndex(projectId, indexId);
  }

  public static void getIndex(String projectId, String indexId) throws IOException {
    // Initializes client that manages composite indexes using Application Default Credentials
    try (DatastoreAdminClient client = DatastoreAdminClient.create()) {
      GetIndexRequest request =
          GetIndexRequest.newBuilder()
              .setProjectId(projectId)
              .setIndexId(indexId)
              .build();

      Index index = client.getIndex(request);

      System.out.println("Index ID: " + index.getIndexId());
      System.out.println("Kind: " + index.getKind());
      System.out.println("State: " + index.getState());
    }
  }
}
// [END datastore_v1_datastoreadmin_index_get]
