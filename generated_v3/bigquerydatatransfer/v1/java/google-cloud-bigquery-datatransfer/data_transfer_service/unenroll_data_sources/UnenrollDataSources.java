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

package com.google.cloud.bigquerydatatransfer.v1;

// [START bigquerydatatransfer_v1_datatransferservice_unenroll_data_sources]
import com.google.cloud.bigquery.datatransfer.v1.DataTransferServiceClient;
import com.google.cloud.bigquery.datatransfer.v1.UnenrollDataSourcesRequest;
import java.io.IOException;

public class UnenrollDataSources {

  public static void main(String[] args) throws IOException {
    String projectId = "example-project-id";
    String locationId = "example-location-id";
    String dataSourceId = "example-data-source-id";
    unenrollDataSources(projectId, locationId, dataSourceId);
  }

  public static void unenrollDataSources(String projectId, String locationId, String dataSourceId)
      throws IOException {
    // Initialize the client that sends requests.
    try (DataTransferServiceClient client = DataTransferServiceClient.create()) {
      String name = String.format("projects/%s/locations/%s", projectId, locationId);
      UnenrollDataSourcesRequest request =
          UnenrollDataSourcesRequest.newBuilder()
              .setName(name)
              .addDataSourceIds(dataSourceId)
              .build();

      client.unenrollDataSources(request);
      System.out.printf("Data source %s unenrolled successfully.%n", dataSourceId);
    }
  }
}
// [END bigquerydatatransfer_v1_datatransferservice_unenroll_data_sources]
