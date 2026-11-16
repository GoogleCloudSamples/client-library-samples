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

// [START analyticshub_v1_analyticshubservice_orgdataexchanges_list]
import com.google.cloud.bigquery.analyticshub.v1.AnalyticsHubServiceClient;
import com.google.cloud.bigquery.analyticshub.v1.DataExchange;
import com.google.cloud.bigquery.analyticshub.v1.ListOrgDataExchangesRequest;
import java.io.IOException;

public class ListOrgDataExchanges {

  public static void main(String[] args) throws IOException {
    String organizationId = "example-organization-id";
    String locationId = "example-location-id";
    listOrgDataExchanges(organizationId, locationId);
  }

  public static void listOrgDataExchanges(String organizationId, String locationId)
      throws IOException {
    // Initialize client within try-with-resources to ensure automatic cleanup
    try (AnalyticsHubServiceClient client = AnalyticsHubServiceClient.create()) {
      String organization =
          String.format("organizations/%s/locations/%s", organizationId, locationId);

      ListOrgDataExchangesRequest request =
          ListOrgDataExchangesRequest.newBuilder()
              .setOrganization(organization)
              .build();

      for (DataExchange dataExchange : client.listOrgDataExchanges(request).iterateAll()) {
        System.out.println("Data exchange: " + dataExchange.getName());
        System.out.println("Display name: " + dataExchange.getDisplayName());
      }
    }
  }
}
// [END analyticshub_v1_analyticshubservice_orgdataexchanges_list]
