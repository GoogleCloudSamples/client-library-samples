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

// [START analyticshub_v1_analyticshubservice_dataexchange_create]
import com.google.cloud.bigquery.analyticshub.v1.AnalyticsHubServiceClient;
import com.google.cloud.bigquery.analyticshub.v1.CreateDataExchangeRequest;
import com.google.cloud.bigquery.analyticshub.v1.DataExchange;
import java.io.IOException;

public class CreateDataExchange {

  public static void main(String[] args) throws IOException {
    String dataExchangeId = "example_data_exchange_id";
    String projectId = "example-project-id";
    String locationId = "example-location-id";
    createDataExchange(dataExchangeId, projectId, locationId);
  }

  public static void createDataExchange(String dataExchangeId, String projectId, String locationId)
      throws IOException {
    try (AnalyticsHubServiceClient client = AnalyticsHubServiceClient.create()) {
      DataExchange dataExchange =
          DataExchange.newBuilder()
              .setDisplayName("Example Data Exchange")
              .setDescription("Example description")
              .build();
      String parent = String.format("projects/%s/locations/%s", projectId, locationId);

      CreateDataExchangeRequest request =
          CreateDataExchangeRequest.newBuilder()
              .setParent(parent)
              .setDataExchangeId(dataExchangeId)
              .setDataExchange(dataExchange)
              .build();

      DataExchange response = client.createDataExchange(request);
      System.out.println("Data exchange created successfully: " + response.getName());
    }
  }
}
// [END analyticshub_v1_analyticshubservice_dataexchange_create]
