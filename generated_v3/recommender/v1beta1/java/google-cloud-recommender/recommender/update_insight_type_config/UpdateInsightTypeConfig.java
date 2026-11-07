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

// [START recommender_v1beta1_recommender_insighttypeconfig_update]
import com.google.cloud.recommender.v1beta1.InsightTypeConfig;
import com.google.cloud.recommender.v1beta1.RecommenderClient;
import com.google.protobuf.FieldMask;

public class UpdateInsightTypeConfig {

  public static void main(String[] args) throws Exception {
    String projectId = "example-project-id";
    String locationId = "example-location-id";
    String insightTypeId = "example-insight-type-id";
    updateInsightTypeConfig(projectId, locationId, insightTypeId);
  }

  public static void updateInsightTypeConfig(
      String projectId, String locationId, String insightTypeId) throws Exception {
    try (RecommenderClient client = RecommenderClient.create()) {
      String name =
          String.format(
              "projects/%s/locations/%s/insightTypes/%s/config",
              projectId, locationId, insightTypeId);

      // Retrieve the current configuration to obtain the required etag.
      InsightTypeConfig currentConfig = client.getInsightTypeConfig(name);

      InsightTypeConfig insightTypeConfig =
          InsightTypeConfig.newBuilder()
              .setName(name)
              .setDisplayName("Example display name")
              .setEtag(currentConfig.getEtag())
              .build();

      FieldMask updateMask = FieldMask.newBuilder().addPaths("display_name").build();

      InsightTypeConfig response = client.updateInsightTypeConfig(insightTypeConfig, updateMask);
      System.out.println("Updated insight type config: " + response.getName());
      System.out.println("Display name: " + response.getDisplayName());
    }
  }
}
// [END recommender_v1beta1_recommender_insighttypeconfig_update]
