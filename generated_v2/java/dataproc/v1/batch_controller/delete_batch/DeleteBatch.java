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

package com.google.cloud.dataproc.v1;

// [START dataproc_v1_batchcontroller_batch_delete]
import com.google.cloud.dataproc.v1.BatchControllerClient;
import com.google.cloud.dataproc.v1.BatchControllerSettings;
import com.google.cloud.dataproc.v1.BatchName;

public class DeleteBatch {

  public static void main(String[] args) throws Exception {
    String projectId = "example-project-id";
    String locationId = "example-location-id";
    String batchId = "example-batch-id";
    deleteBatch(projectId, locationId, batchId);
  }

  public static void deleteBatch(String projectId, String locationId, String batchId)
      throws Exception {
    // Configure the regional endpoint for the Dataproc BatchController service.
    BatchControllerSettings batchControllerSettings =
        BatchControllerSettings.newBuilder()
            .setEndpoint(String.format("%s-dataproc.googleapis.com:443", locationId))
            .build();

    try (BatchControllerClient client = BatchControllerClient.create(batchControllerSettings)) {
      String name = BatchName.of(projectId, locationId, batchId).toString();
      client.deleteBatch(name);
      System.out.printf("Batch deleted successfully: %s%n", name);
    }
  }
}
// [END dataproc_v1_batchcontroller_batch_delete]
