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

// [START analyticshub_v1_analyticshubservice_querytemplates_list]
import com.google.cloud.bigquery.analyticshub.v1.AnalyticsHubServiceClient;
import com.google.cloud.bigquery.analyticshub.v1.DataExchangeName;
import com.google.cloud.bigquery.analyticshub.v1.QueryTemplate;
import java.io.IOException;

public class ListQueryTemplates {

  public static void main(String[] args) throws IOException {
    String projectId = "example-project_id";
    String locationId = "example-location_id";
    String dataExchangeId = "example-data_exchange_id";
    listQueryTemplates(projectId, locationId, dataExchangeId);
  }

  public static void listQueryTemplates(String projectId, String locationId, String dataExchangeId)
      throws IOException {
    try (AnalyticsHubServiceClient client = AnalyticsHubServiceClient.create()) {
      String parent = DataExchangeName.of(projectId, locationId, dataExchangeId).toString();
      for (QueryTemplate queryTemplate : client.listQueryTemplates(parent).iterateAll()) {
        System.out.println("Query template name: " + queryTemplate.getName());
        System.out.println("Display name: " + queryTemplate.getDisplayName());
      }
    }
  }
}
// [END analyticshub_v1_analyticshubservice_querytemplates_list]
