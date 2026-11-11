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

// [START recommender_v1_recommender_mark_recommendation_claimed]
import com.google.cloud.recommender.v1.MarkRecommendationClaimedRequest;
import com.google.cloud.recommender.v1.Recommendation;
import com.google.cloud.recommender.v1.RecommendationName;
import com.google.cloud.recommender.v1.RecommenderClient;
import java.io.IOException;

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
    // Ensure the etag is enclosed in quotes for precondition validation.
    if (!etag.startsWith("\"")) {
      etag = "\"" + etag + "\"";
    }

    try (RecommenderClient client = RecommenderClient.create()) {
      String name =
          RecommendationName.of(projectId, locationId, recommenderId, recommendationId).toString();

      MarkRecommendationClaimedRequest request =
          MarkRecommendationClaimedRequest.newBuilder()
              .setName(name)
              .setEtag(etag)
              .build();

      Recommendation response = client.markRecommendationClaimed(request);
      System.out.println("Marked recommendation as claimed: " + response.getName());
      System.out.println("Recommendation state: " + response.getStateInfo().getState());
    }
  }
}
// [END recommender_v1_recommender_mark_recommendation_claimed]
