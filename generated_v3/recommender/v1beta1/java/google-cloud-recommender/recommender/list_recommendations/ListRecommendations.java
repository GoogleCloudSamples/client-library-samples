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

// [START recommender_v1beta1_recommender_recommendations_list]
import com.google.cloud.recommender.v1beta1.ListRecommendationsRequest;
import com.google.cloud.recommender.v1beta1.Recommendation;
import com.google.cloud.recommender.v1beta1.RecommenderClient;
import java.io.IOException;

public class ListRecommendations {

  public static void main(String[] args) throws IOException {
    String locationId = "global";
    String recommenderId = "google.iam.policy.Recommender";
    String projectId = "example-project-id";
    listRecommendations(locationId, recommenderId, projectId);
  }

  public static void listRecommendations(String locationId, String recommenderId, String projectId)
      throws IOException {
    try (RecommenderClient client = RecommenderClient.create()) {
      String parent =
          String.format(
              "projects/%s/locations/%s/recommenders/%s", projectId, locationId, recommenderId);
      ListRecommendationsRequest request =
          ListRecommendationsRequest.newBuilder().setParent(parent).build();
      for (Recommendation recommendation : client.listRecommendations(request).iterateAll()) {
        System.out.printf("Recommendation name: %s%n", recommendation.getName());
        System.out.printf("Description: %s%n", recommendation.getDescription());
      }
    }
  }
}
// [END recommender_v1beta1_recommender_recommendations_list]
