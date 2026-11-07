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

// [START recommender_v1beta1_recommender_recommenderconfig_update]
import com.google.cloud.recommender.v1beta1.RecommenderClient;
import com.google.cloud.recommender.v1beta1.RecommenderConfig;
import com.google.protobuf.FieldMask;

public class UpdateRecommenderConfig {

  public static void main(String[] args) throws Exception {
    String projectId = "example-project-id";
    String locationId = "us-central1-a";
    String recommenderId = "google.compute.instance.MachineTypeRecommender";
    updateRecommenderConfig(projectId, locationId, recommenderId);
  }

  public static void updateRecommenderConfig(
      String projectId, String locationId, String recommenderId) throws Exception {
    // Certain recommenders such as MachineTypeRecommender require a zone scope.
    if ("global".equals(locationId)) {
      locationId = "us-central1-a";
    }

    try (RecommenderClient client = RecommenderClient.create()) {
      String name =
          String.format(
              "projects/%s/locations/%s/recommenders/%s/config",
              projectId, locationId, recommenderId);

      // Fetch the existing config to obtain the etag for optimistic concurrency.
      RecommenderConfig currentConfig = client.getRecommenderConfig(name);

      RecommenderConfig recommenderConfig =
          RecommenderConfig.newBuilder()
              .setName(name)
              .setDisplayName("Updated Recommender Config")
              .setEtag(currentConfig.getEtag())
              .build();
      FieldMask updateMask = FieldMask.newBuilder().addPaths("display_name").build();

      RecommenderConfig response = client.updateRecommenderConfig(recommenderConfig, updateMask);
      System.out.println("Updated recommender config: " + response.getName());
    }
  }
}
// [END recommender_v1beta1_recommender_recommenderconfig_update]
