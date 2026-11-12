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

// [START contactcenterinsights_v1_contactcenterinsights_calculate_stats]
import com.google.cloud.contactcenterinsights.v1.CalculateStatsRequest;
import com.google.cloud.contactcenterinsights.v1.CalculateStatsResponse;
import com.google.cloud.contactcenterinsights.v1.ContactCenterInsightsClient;
import com.google.cloud.contactcenterinsights.v1.LocationName;
import java.io.IOException;

public class CalculateStats {

  public static void main(String[] args) throws Exception {
    String projectId = "example-project-id";
    String locationId = "example-location-id";
    calculateStats(projectId, locationId);
  }

  public static void calculateStats(String projectId, String locationId) throws Exception {
    try (ContactCenterInsightsClient client = ContactCenterInsightsClient.create()) {
      String location = LocationName.of(projectId, locationId).toString();

      CalculateStatsRequest request =
          CalculateStatsRequest.newBuilder()
              .setLocation(location)
              .build();

      CalculateStatsResponse response = client.calculateStats(request);
      System.out.printf("Total conversations: %d%n", response.getConversationCount());
    }
  }
}
// [END contactcenterinsights_v1_contactcenterinsights_calculate_stats]
