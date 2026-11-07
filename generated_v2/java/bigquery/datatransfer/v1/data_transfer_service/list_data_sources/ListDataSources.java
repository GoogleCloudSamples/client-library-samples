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

// [START bigquerydatatransfer_v1_datatransferservice_datasources_list]
import com.google.cloud.bigquery.datatransfer.v1.DataSource;
import com.google.cloud.bigquery.datatransfer.v1.DataTransferServiceClient;
import com.google.cloud.bigquery.datatransfer.v1.ListDataSourcesRequest;
import java.io.IOException;

public class ListDataSources {

  public static void main(String[] args) throws IOException {
    String projectId = "example-project-id";
    String locationId = "example-location-id";
    listDataSources(projectId, locationId);
  }

  public static void listDataSources(String projectId, String locationId) throws IOException {
    try (DataTransferServiceClient client = DataTransferServiceClient.create()) {
      String parent = "projects/" + projectId + "/locations/" + locationId;
      ListDataSourcesRequest request =
          ListDataSourcesRequest.newBuilder().setParent(parent).build();

      for (DataSource dataSource : client.listDataSources(request).iterateAll()) {
        System.out.println("Data source ID: " + dataSource.getDataSourceId());
        System.out.println("Display name: " + dataSource.getDisplayName());
      }
    }
  }
}
// [END bigquerydatatransfer_v1_datatransferservice_datasources_list]
