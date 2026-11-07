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

// [START recommender_v1_recommender_mark_recommendation_succeeded]
import com.google.cloud.recommender.v1.Recommendation;
import com.google.cloud.recommender.v1.RecommendationName;
import com.google.cloud.recommender.v1.RecommenderClient;
import java.io.IOException;
import java.util.Collections;
import java.util.Map;

public class MarkRecommendationSucceeded {

  public static void main(String[] args) throws Exception {
    String projectId = "example-project_id";
    String locationId = "example-location_id";
    String recommenderId = "example-recommender_id";
    String recommendationId = "example-recommendation_id";
    markRecommendationSucceeded(projectId, locationId, recommenderId, recommendationId);
  }

  public static void markRecommendationSucceeded(
      String projectId, String locationId, String recommenderId, String recommendationId)
      throws Exception {
    try (RecommenderClient client = RecommenderClient.create()) {
      String name =
          RecommendationName.of(projectId, locationId, recommenderId, recommendationId).toString();

      // Retrieve the current fingerprint to satisfy optimistic locking requirements.
      Recommendation recommendation = client.getRecommendation(name);
      String etag = recommendation.getEtag();

      Map<String, String> stateMetadata = Collections.singletonMap("reason", "applied");

      Recommendation response = client.markRecommendationSucceeded(name, stateMetadata, etag);
      System.out.println("Marked recommendation as succeeded: " + response.getName());
      System.out.println("Updated state: " + response.getStateInfo().getState());
    }
  }
}
// [END recommender_v1_recommender_mark_recommendation_succeeded]
