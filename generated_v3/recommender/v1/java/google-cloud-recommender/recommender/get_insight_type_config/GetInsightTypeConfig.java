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

package com.google.cloud.recommender.v1;

// [START recommender_v1_recommender_insighttypeconfig_get]
import com.google.cloud.recommender.v1.GetInsightTypeConfigRequest;
import com.google.cloud.recommender.v1.InsightTypeConfig;
import com.google.cloud.recommender.v1.RecommenderClient;

public class GetInsightTypeConfig {

  public static void main(String[] args) throws Exception {
    String locationId = "global";
    String insightTypeId = "google.compute.firewall.Insight";
    String projectId = "example-project-id";
    getInsightTypeConfig(locationId, insightTypeId, projectId);
  }

  public static void getInsightTypeConfig(
      String locationId, String insightTypeId, String projectId) throws Exception {
    // Initialize the client that sends requests. Create the client once and reuse it.
    try (RecommenderClient client = RecommenderClient.create()) {
      String name =
          String.format(
              "projects/%s/locations/%s/insightTypes/%s/config",
              projectId, locationId, insightTypeId);

      GetInsightTypeConfigRequest request =
          GetInsightTypeConfigRequest.newBuilder().setName(name).build();

      InsightTypeConfig response = client.getInsightTypeConfig(request);

      System.out.println("Insight type config name: " + response.getName());
      System.out.println("ETag: " + response.getEtag());
      System.out.println("Update time: " + response.getUpdateTime());
    }
  }
}
// [END recommender_v1_recommender_insighttypeconfig_get]
