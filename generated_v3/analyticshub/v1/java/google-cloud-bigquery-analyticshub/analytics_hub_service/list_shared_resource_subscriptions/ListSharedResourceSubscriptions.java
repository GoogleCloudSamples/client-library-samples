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

// [START analyticshub_v1_analyticshubservice_sharedresourcesubscriptions_list]
import com.google.cloud.bigquery.analyticshub.v1.AnalyticsHubServiceClient;
import com.google.cloud.bigquery.analyticshub.v1.DataExchangeName;
import com.google.cloud.bigquery.analyticshub.v1.ListSharedResourceSubscriptionsRequest;
import com.google.cloud.bigquery.analyticshub.v1.Subscription;
import java.io.IOException;

public class ListSharedResourceSubscriptions {

  public static void main(String[] args) throws IOException {
    String projectId = "example-project-id";
    String locationId = "example-location-id";
    String dataExchangeId = "example-data-exchange-id";
    listSharedResourceSubscriptions(projectId, locationId, dataExchangeId);
  }

  public static void listSharedResourceSubscriptions(
      String projectId, String locationId, String dataExchangeId) throws IOException {
    // Initialize the client. Create once and reuse across requests.
    try (AnalyticsHubServiceClient client = AnalyticsHubServiceClient.create()) {
      String resource = DataExchangeName.of(projectId, locationId, dataExchangeId).toString();

      ListSharedResourceSubscriptionsRequest request =
          ListSharedResourceSubscriptionsRequest.newBuilder()
              .setResource(resource)
              .build();

      for (Subscription subscription : client.listSharedResourceSubscriptions(request).iterateAll()) {
        System.out.println("Shared resource subscription: " + subscription.getName());
      }
    }
  }
}
// [END analyticshub_v1_analyticshubservice_sharedresourcesubscriptions_list]
