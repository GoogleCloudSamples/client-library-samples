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

// [START analyticshub_v1_analyticshubservice_dataexchange_get]
import com.google.cloud.bigquery.analyticshub.v1.AnalyticsHubServiceClient;
import com.google.cloud.bigquery.analyticshub.v1.DataExchange;
import com.google.cloud.bigquery.analyticshub.v1.DataExchangeName;
import java.io.IOException;

public class GetDataExchange {

  public static void main(String[] args) throws IOException {
    String projectId = "example-project-id";
    String locationId = "example-location-id";
    String dataExchangeId = "example-data-exchange-id";
    getDataExchange(projectId, locationId, dataExchangeId);
  }

  public static void getDataExchange(String projectId, String locationId, String dataExchangeId)
      throws IOException {
    try (AnalyticsHubServiceClient client = AnalyticsHubServiceClient.create()) {
      String name = DataExchangeName.of(projectId, locationId, dataExchangeId).toString();

      DataExchange response = client.getDataExchange(name);

      System.out.println("Data exchange retrieved successfully: " + response.getName());
      System.out.println("Display name: " + response.getDisplayName());
      System.out.println("Description: " + response.getDescription());
    }
  }
}
// [END analyticshub_v1_analyticshubservice_dataexchange_get]
