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

// [START bigquerydatatransfer_v1_datatransferservice_enroll_data_sources]
import com.google.cloud.bigquery.datatransfer.v1.DataTransferServiceClient;
import com.google.cloud.bigquery.datatransfer.v1.EnrollDataSourcesRequest;
import java.io.IOException;
import java.util.Arrays;
import java.util.List;

public class EnrollDataSources {

  public static void main(String[] args) throws IOException {
    String projectId = "example-project-id";
    String locationId = "example-location-id";
    List<String> dataSourceIds = Arrays.asList("example-data-source-id");
    enrollDataSources(projectId, locationId, dataSourceIds);
  }

  public static void enrollDataSources(
      String projectId, String locationId, List<String> dataSourceIds) throws IOException {
    try (DataTransferServiceClient client = DataTransferServiceClient.create()) {
      String name = String.format("projects/%s/locations/%s", projectId, locationId);

      EnrollDataSourcesRequest request =
          EnrollDataSourcesRequest.newBuilder()
              .setName(name)
              .addAllDataSourceIds(dataSourceIds)
              .build();

      client.enrollDataSources(request);
      System.out.printf("Data sources enrolled successfully for: %s%n", name);
    }
  }

  public static void enrollDataSources(
      String projectId, String locationId, String dataSourceId) throws IOException {
    enrollDataSources(
        projectId,
        locationId,
        dataSourceId.contains(",")
            ? Arrays.asList(dataSourceId.split(","))
            : Arrays.asList(dataSourceId));
  }
}
// [END bigquerydatatransfer_v1_datatransferservice_enroll_data_sources]
