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

package com.google.cloud.analyticshub.v1;

// [START analyticshub_v1_analyticshubservice_dataexchange_update]
import com.google.cloud.bigquery.analyticshub.v1.AnalyticsHubServiceClient;
import com.google.cloud.bigquery.analyticshub.v1.DataExchange;
import com.google.protobuf.FieldMask;

public class UpdateDataExchange {

  public static void main(String[] args) throws Exception {
    String projectId = "example-project_id";
    String locationId = "example-location_id";
    String dataExchangeId = "example-data_exchange_id";
    updateDataExchange(projectId, locationId, dataExchangeId);
  }

  public static void updateDataExchange(
      String projectId, String locationId, String dataExchangeId) throws Exception {
    // Initialize client that will be automatically closed when finished.
    try (AnalyticsHubServiceClient client = AnalyticsHubServiceClient.create()) {
      // Specify the fields to update to perform a partial update.
      FieldMask updateMask = FieldMask.newBuilder().addPaths("description").build();

      String dataExchangeName =
          String.format(
              "projects/%s/locations/%s/dataExchanges/%s",
              projectId, locationId, dataExchangeId);
      DataExchange dataExchange =
          DataExchange.newBuilder()
              .setName(dataExchangeName)
              .setDescription("Updated description for example-data-exchange")
              .build();

      DataExchange response = client.updateDataExchange(dataExchange, updateMask);
      System.out.println("Updated data exchange: " + response.getName());
    }
  }
}
// [END analyticshub_v1_analyticshubservice_dataexchange_update]
