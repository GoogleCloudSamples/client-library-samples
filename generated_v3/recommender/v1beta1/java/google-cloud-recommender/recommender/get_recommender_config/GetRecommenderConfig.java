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

// [START recommender_v1beta1_recommender_recommenderconfig_get]
import com.google.cloud.recommender.v1beta1.RecommenderClient;
import com.google.cloud.recommender.v1beta1.RecommenderConfig;

public class GetRecommenderConfig {

  public static void main(String[] args) throws Exception {
    String locationId = "us-central1-a";
    String recommenderId = "google.compute.instance.MachineTypeRecommender";
    String projectId = "example-project-id";
    getRecommenderConfig(locationId, recommenderId, projectId);
  }

  public static void getRecommenderConfig(
      String locationId, String recommenderId, String projectId) throws Exception {
    // Compute recommender configs require a zone scope rather than global.
    if ("global".equals(locationId)) {
      locationId = "us-central1-a";
    }
    try (RecommenderClient client = RecommenderClient.create()) {
      String name =
          String.format(
              "projects/%s/locations/%s/recommenders/%s/config",
              projectId, locationId, recommenderId);
      RecommenderConfig config = client.getRecommenderConfig(name);
      System.out.println("Retrieved recommender config: " + config.getName());
    }
  }
}
// [END recommender_v1beta1_recommender_recommenderconfig_get]
