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

// [START recommender_v1_recommender_recommenderconfig_update]
import com.google.cloud.recommender.v1.RecommenderClient;
import com.google.cloud.recommender.v1.RecommenderConfig;
import com.google.protobuf.FieldMask;
import java.io.IOException;

public class UpdateRecommenderConfig {

  public static void main(String[] args) throws IOException {
    String projectId = "example-project-id";
    String locationId = "us-central1-a";
    String recommenderId = "google.compute.instance.MachineTypeRecommender";
    updateRecommenderConfig(projectId, locationId, recommenderId);
  }

  public static void updateRecommenderConfig(
      String projectId, String locationId, String recommenderId) throws IOException {
    // Recommender configurations for Compute Engine resources require a zonal scope rather than global
    if (locationId == null || "global".equals(locationId)) {
      locationId = "us-central1-a";
    }

    try (RecommenderClient client = RecommenderClient.create()) {
      String configName =
          String.format(
              "projects/%s/locations/%s/recommenders/%s/config",
              projectId, locationId, recommenderId);

      // Concurrency control requires fetching the existing configuration's current etag
      RecommenderConfig currentConfig = client.getRecommenderConfig(configName);

      RecommenderConfig recommenderConfig =
          RecommenderConfig.newBuilder()
              .setName(configName)
              .setDisplayName("Updated Recommender Config")
              .setEtag(currentConfig.getEtag())
              .build();

      FieldMask updateMask = FieldMask.newBuilder().addPaths("display_name").build();

      RecommenderConfig response = client.updateRecommenderConfig(recommenderConfig, updateMask);
      System.out.println("Updated recommender configuration: " + response.getName());
      System.out.println("Display name: " + response.getDisplayName());
    }
  }
}
// [END recommender_v1_recommender_recommenderconfig_update]
