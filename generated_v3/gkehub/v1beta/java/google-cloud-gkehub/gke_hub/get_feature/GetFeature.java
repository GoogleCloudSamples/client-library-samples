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

package com.google.cloud.gkehub.v1beta;

// [START gkehub_v1beta_gkehub_feature_get]
import com.google.cloud.gkehub.v1beta.Feature;
import com.google.cloud.gkehub.v1beta.GkeHubClient;

public class GetFeature {

  public static void main(String[] args) throws Exception {
    String projectId = "example-project-id";
    // GKE Hub is currently available in the global region.
    String locationId = "global";
    String featureId = "example-feature-id";
    getFeature(projectId, locationId, featureId);
  }

  public static void getFeature(String projectId, String locationId, String featureId)
      throws Exception {
    // Initialize client that is automatically closed at the end of the try block.
    try (GkeHubClient client = GkeHubClient.create()) {
      String name =
          String.format("projects/%s/locations/%s/features/%s", projectId, locationId, featureId);
      Feature feature = client.getFeature(name);

      System.out.println("Feature retrieved successfully: " + feature.getName());
      System.out.println("Feature state: " + feature.getState().getState().getCode());
    }
  }
}
// [END gkehub_v1beta_gkehub_feature_get]
