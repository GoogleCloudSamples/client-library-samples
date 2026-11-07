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

// [START gkehub_v1beta_gkehub_feature_update]
import com.google.cloud.gkehub.v1beta.Feature;
import com.google.cloud.gkehub.v1beta.GkeHubClient;
import com.google.protobuf.FieldMask;
import java.util.concurrent.TimeUnit;

public class UpdateFeature {

  public static void main(String[] args) throws Exception {
    String projectId = "example-project-id";
    // GKE Hub features are currently only available in the global location.
    String locationId = "global";
    String featureId = "example-feature-id";
    updateFeature(projectId, locationId, featureId);
  }

  public static void updateFeature(String projectId, String locationId, String featureId)
      throws Exception {
    try (GkeHubClient client = GkeHubClient.create()) {
      String name = String.format(
          "projects/%s/locations/%s/features/%s", projectId, locationId, featureId);
      Feature resource = Feature.newBuilder()
          .putLabels("env", "prod")
          .build();
      FieldMask updateMask = FieldMask.newBuilder()
          .addPaths("labels")
          .build();

      // Initiate the update and wait for the long-running operation to complete.
      Feature response = client.updateFeatureAsync(name, resource, updateMask).get(5, TimeUnit.MINUTES);
      System.out.println("Feature updated successfully: " + response.getName());
    }
  }
}
// [END gkehub_v1beta_gkehub_feature_update]
