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

package com.google.cloud.dataplex.v1;

// [START dataplex_v1_datascanservice_datascan_create]
import com.google.cloud.dataplex.v1.DataProfileSpec;
import com.google.cloud.dataplex.v1.DataScan;
import com.google.cloud.dataplex.v1.DataScanServiceClient;
import com.google.cloud.dataplex.v1.DataSource;
import java.io.IOException;
import java.util.concurrent.ExecutionException;

public class CreateDataScan {

  public static void main(String[] args) throws Exception {
    String projectId = "example-project-id";
    String locationId = "example-location-id";
    String dataScanId = "example-data-scan-id";
    createDataScan(projectId, locationId, dataScanId);
  }

  public static void createDataScan(String projectId, String locationId, String dataScanId)
      throws IOException, ExecutionException, InterruptedException {
    // Initialize the client that manages DataScan service requests.
    try (DataScanServiceClient client = DataScanServiceClient.create()) {
      String parent = String.format("projects/%s/locations/%s", projectId, locationId);

      String resource =
          String.format(
              "//bigquery.googleapis.com/projects/%s/datasets/sample_dataset/tables/sample_table",
              projectId);
      DataSource dataSource = DataSource.newBuilder().setResource(resource).build();
      DataProfileSpec dataProfileSpec = DataProfileSpec.newBuilder().build();

      DataScan dataScan =
          DataScan.newBuilder()
              .setData(dataSource)
              .setDataProfileSpec(dataProfileSpec)
              .build();

      // Initiate the long-running operation to create the data scan and wait for completion.
      DataScan createdDataScan = client.createDataScanAsync(parent, dataScan, dataScanId).get();
      System.out.println("Data scan created successfully: " + createdDataScan.getName());
    }
  }
}
// [END dataplex_v1_datascanservice_datascan_create]
