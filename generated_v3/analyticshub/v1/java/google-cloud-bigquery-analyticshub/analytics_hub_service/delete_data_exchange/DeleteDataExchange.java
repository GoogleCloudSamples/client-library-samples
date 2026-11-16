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

// [START analyticshub_v1_analyticshubservice_dataexchange_delete]
import com.google.cloud.bigquery.analyticshub.v1.AnalyticsHubServiceClient;
import com.google.cloud.bigquery.analyticshub.v1.DataExchangeName;
import java.io.IOException;

public class DeleteDataExchange {

  public static void main(String[] args) throws IOException {
    String projectId = "example-project-id";
    String locationId = "example-location-id";
    String dataExchangeId = "example-data-exchange-id";
    deleteDataExchange(projectId, locationId, dataExchangeId);
  }

  public static void deleteDataExchange(String projectId, String locationId, String dataExchangeId)
      throws IOException {
    // Initialize client that sends requests. Create once and reuse for multiple requests.
    try (AnalyticsHubServiceClient client = AnalyticsHubServiceClient.create()) {
      String name = DataExchangeName.of(projectId, locationId, dataExchangeId).toString();

      client.deleteDataExchange(name);
      System.out.println("Data exchange deleted successfully: " + name);
    }
  }
}
// [END analyticshub_v1_analyticshubservice_dataexchange_delete]
