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

package com.google.cloud.contactcenterinsights.v1;

// [START contactcenterinsights_v1_contactcenterinsights_query_metrics]
import com.google.cloud.contactcenterinsights.v1.ContactCenterInsightsClient;
import com.google.cloud.contactcenterinsights.v1.QueryMetricsRequest;
import com.google.cloud.contactcenterinsights.v1.QueryMetricsResponse;
import java.io.IOException;
import java.util.concurrent.ExecutionException;
import java.util.concurrent.TimeUnit;
import java.util.concurrent.TimeoutException;

public class QueryMetrics {

  public static void main(String[] args) throws Exception {
    String projectId = "example-project-id";
    String locationId = "example-location-id";
    queryMetrics(projectId, locationId);
  }

  public static void queryMetrics(String projectId, String locationId) throws Exception {
    try (ContactCenterInsightsClient client = ContactCenterInsightsClient.create()) {
      String filter =
          "create_time >= \"2023-01-01T00:00:00Z\" AND create_time < \"2023-01-02T00:00:00Z\"";
      String location = String.format("projects/%s/locations/%s", projectId, locationId);

      QueryMetricsRequest request =
          QueryMetricsRequest.newBuilder()
              .setLocation(location)
              .setFilter(filter)
              .build();

      QueryMetricsResponse response = client.queryMetricsAsync(request).get(5, TimeUnit.MINUTES);
      System.out.printf("Retrieved %d metric slices.%n", response.getSlicesCount());
    }
  }
}
// [END contactcenterinsights_v1_contactcenterinsights_query_metrics]
