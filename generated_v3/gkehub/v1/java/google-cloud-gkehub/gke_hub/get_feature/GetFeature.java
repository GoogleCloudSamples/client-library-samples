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

package com.google.cloud.gkehub.v1;

// [START gkehub_v1_gkehub_feature_get]
import com.google.cloud.gkehub.v1.Feature;
import com.google.cloud.gkehub.v1.FeatureName;
import com.google.cloud.gkehub.v1.GkeHubClient;

public class GetFeature {

  public static void main(String[] args) throws Exception {
    String projectId = "example-project_id";
    String locationId = "example-location_id";
    String featureId = "example-feature_id";
    getFeature(projectId, locationId, featureId);
  }

  public static void getFeature(String projectId, String locationId, String featureId) throws Exception {
    // Initialize client that will be closed automatically with try-with-resources
    try (GkeHubClient client = GkeHubClient.create()) {
      FeatureName name = FeatureName.of(projectId, locationId, featureId);
      Feature feature = client.getFeature(name);

      System.out.println("Feature retrieved: " + feature.getName());
      System.out.println("Feature state: " + feature.getState().getState().getCode());
      System.out.println("Feature create time: " + feature.getCreateTime());
    }
  }
}
// [END gkehub_v1_gkehub_feature_get]
