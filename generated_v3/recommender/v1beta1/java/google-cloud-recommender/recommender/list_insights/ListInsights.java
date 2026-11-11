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

package com.google.cloud.recommender.v1beta1;

// [START recommender_v1beta1_recommender_insights_list]
import com.google.cloud.recommender.v1beta1.Insight;
import com.google.cloud.recommender.v1beta1.RecommenderClient;

public class ListInsights {

  public static void main(String[] args) throws Exception {
    String locationId = "example-location_id";
    String insightTypeId = "example-insight_type_id";
    String projectId = "example-project_id";
    listInsights(locationId, insightTypeId, projectId);
  }

  public static void listInsights(String locationId, String insightTypeId, String projectId)
      throws Exception {
    try (RecommenderClient client = RecommenderClient.create()) {
      String parent =
          String.format(
              "projects/%s/locations/%s/insightTypes/%s", projectId, locationId, insightTypeId);

      for (Insight insight : client.listInsights(parent).iterateAll()) {
        System.out.println("Insight name: " + insight.getName());
        System.out.println("Description: " + insight.getDescription());
        System.out.println("Severity: " + insight.getSeverity());
        System.out.println("State: " + insight.getStateInfo().getState());
      }
    }
  }
}
// [END recommender_v1beta1_recommender_insights_list]
