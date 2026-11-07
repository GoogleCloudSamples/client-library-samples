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

package com.google.cloud.capacityplanner.v1beta;

// [START capacityplanner_v1beta_usageservice_query_usage_histories]
import com.google.cloud.capacityplanner.v1beta.QueryUsageHistoriesRequest;
import com.google.cloud.capacityplanner.v1beta.QueryUsageHistoriesResponse;
import com.google.cloud.capacityplanner.v1beta.UsageHistory;
import com.google.cloud.capacityplanner.v1beta.UsageServiceClient;
import java.io.IOException;

public class QueryUsageHistories {

  public static void main(String[] args) throws IOException {
    String projectId = "example-project-id";
    String locationId = "example-location-id";
    queryUsageHistories(projectId, locationId);
  }

  public static void queryUsageHistories(String projectId, String locationId) throws IOException {
    try (UsageServiceClient client = UsageServiceClient.create()) {
      String cloudResourceType = "gce-vcpus";
      String parent = String.format("projects/%s/locations/%s", projectId, locationId);

      QueryUsageHistoriesRequest request =
          QueryUsageHistoriesRequest.newBuilder()
              .setParent(parent)
              .setCloudResourceType(cloudResourceType)
              .build();

      QueryUsageHistoriesResponse response = client.queryUsageHistories(request);
      for (UsageHistory usageHistory : response.getUsageHistoriesList()) {
        System.out.println("Retrieved usage history: " + usageHistory);
      }
    }
  }
}
// [END capacityplanner_v1beta_usageservice_query_usage_histories]
