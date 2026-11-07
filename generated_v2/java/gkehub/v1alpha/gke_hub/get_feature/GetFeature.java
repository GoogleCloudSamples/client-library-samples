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

package com.google.cloud.gkehub.v1alpha;

// [START gkehub_v1alpha_gkehub_feature_get]
import com.google.cloud.gkehub.v1alpha.Feature;
import com.google.cloud.gkehub.v1alpha.GkeHubClient;
import java.io.IOException;

public class GetFeature {

  public static void main(String[] args) throws IOException {
    String projectId = "example-project-id";
    // GKE Hub features are supported in the global region.
    String locationId = "global";
    String featureId = "example-feature-id";
    getFeature(projectId, locationId, featureId);
  }

  public static void getFeature(String projectId, String locationId, String featureId)
      throws IOException {
    String name =
        String.format("projects/%s/locations/%s/features/%s", projectId, locationId, featureId);

    try (GkeHubClient client = GkeHubClient.create()) {
      Feature response = client.getFeature(name);
      System.out.println("Feature retrieved: " + response.getName());
    }
  }
}
// [END gkehub_v1alpha_gkehub_feature_get]
