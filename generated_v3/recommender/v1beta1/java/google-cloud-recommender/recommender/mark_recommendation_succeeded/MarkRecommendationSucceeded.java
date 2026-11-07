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

// [START recommender_v1beta1_recommender_mark_recommendation_succeeded]
import com.google.cloud.recommender.v1beta1.Recommendation;
import com.google.cloud.recommender.v1beta1.RecommendationName;
import com.google.cloud.recommender.v1beta1.RecommenderClient;
import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

public class MarkRecommendationSucceeded {

  public static void main(String[] args) throws IOException {
    String projectId = "example-project_id";
    String locationId = "example-location_id";
    String recommenderId = "example-recommender_id";
    String recommendationId = "example-recommendation_id";
    String etag = "\"example-etag\"";
    markRecommendationSucceeded(projectId, locationId, recommenderId, recommendationId, etag);
  }

  public static void markRecommendationSucceeded(
      String projectId,
      String locationId,
      String recommenderId,
      String recommendationId,
      String etag)
      throws IOException {
    // Ensure the etag is enclosed in quotes required by the API.
    if (etag != null && !etag.startsWith("\"") && !etag.endsWith("\"")) {
      etag = "\"" + etag + "\"";
    }

    // Initialize client that closes automatically at the end of the try block.
    try (RecommenderClient client = RecommenderClient.create()) {
      String name =
          RecommendationName.of(projectId, locationId, recommenderId, recommendationId).toString();
      // Record metadata describing the state transition.
      Map<String, String> stateMetadata = new HashMap<>();
      stateMetadata.put("applied_by", "example-user");

      Recommendation response = client.markRecommendationSucceeded(name, stateMetadata, etag);

      System.out.println("Marked recommendation as succeeded: " + response.getName());
      System.out.println("Recommendation state: " + response.getStateInfo().getState());
    }
  }
}
// [END recommender_v1beta1_recommender_mark_recommendation_succeeded]
