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

// [START recommender_v1beta1_recommender_mark_recommendation_claimed]
import com.google.cloud.recommender.v1beta1.Recommendation;
import com.google.cloud.recommender.v1beta1.RecommendationName;
import com.google.cloud.recommender.v1beta1.RecommenderClient;
import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

public class MarkRecommendationClaimed {

  public static void main(String[] args) throws IOException {
    String projectId = "example-project-id";
    String locationId = "example-location-id";
    String recommenderId = "example-recommender-id";
    String recommendationId = "example-recommendation-id";
    String etag = "example-etag";
    markRecommendationClaimed(projectId, locationId, recommenderId, recommendationId, etag);
  }

  public static void markRecommendationClaimed(
      String projectId,
      String locationId,
      String recommenderId,
      String recommendationId,
      String etag)
      throws IOException {
    // The Recommender API requires etag values to be enclosed in double quotes.
    if (!etag.startsWith("\"")) {
      etag = "\"" + etag + "\"";
    }

    try (RecommenderClient client = RecommenderClient.create()) {
      String name =
          RecommendationName.formatProjectLocationRecommenderRecommendationName(
              projectId, locationId, recommenderId, recommendationId);
      Map<String, String> stateMetadata = new HashMap<>();

      Recommendation response = client.markRecommendationClaimed(name, stateMetadata, etag);

      System.out.println("Marked recommendation as claimed: " + response.getName());
      System.out.println("Recommendation state: " + response.getStateInfo().getState());
    }
  }
}
// [END recommender_v1beta1_recommender_mark_recommendation_claimed]
