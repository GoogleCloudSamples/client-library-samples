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

// [START datastore_v1_datastoreadmin_import_entities]
import com.google.api.gax.longrunning.OperationFuture;
import com.google.cloud.datastore.admin.v1.DatastoreAdminClient;
import com.google.datastore.admin.v1.ImportEntitiesMetadata;
import com.google.datastore.admin.v1.ImportEntitiesRequest;
import com.google.protobuf.Empty;
import java.util.concurrent.TimeUnit;

public class ImportEntities {

  public static void main(String[] args) throws Exception {
    String projectId = "example-project_id";
    String inputUrl = "example-input_url";
    importEntities(projectId, inputUrl);
  }

  public static void importEntities(String projectId, String inputUrl) throws Exception {
    try (DatastoreAdminClient client = DatastoreAdminClient.create()) {
      ImportEntitiesRequest request =
          ImportEntitiesRequest.newBuilder()
              .setProjectId(projectId)
              .setInputUrl(inputUrl)
              .build();

      OperationFuture<Empty, ImportEntitiesMetadata> operationFuture =
          client.importEntitiesAsync(request);

      System.out.println("Waiting for operation to complete: " + operationFuture.getName());
      operationFuture.get(10, TimeUnit.MINUTES);
      System.out.println("Entities imported successfully from: " + inputUrl);
    }
  }
}
// [END datastore_v1_datastoreadmin_import_entities]
