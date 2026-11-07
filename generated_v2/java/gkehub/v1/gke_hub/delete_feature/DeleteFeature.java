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

// [START gkehub_v1_gkehub_feature_delete]
import com.google.cloud.gkehub.v1.FeatureName;
import com.google.cloud.gkehub.v1.GkeHubClient;
import java.io.IOException;
import java.util.concurrent.ExecutionException;
import java.util.concurrent.TimeUnit;
import java.util.concurrent.TimeoutException;

public class DeleteFeature {

  public static void main(String[] args) throws Exception {
    String projectId = "example-project-id";
    String locationId = "global";
    String featureId = "example-feature-id";
    deleteFeature(projectId, locationId, featureId);
  }

  public static void deleteFeature(String projectId, String locationId, String featureId)
      throws Exception {
    try (GkeHubClient client = GkeHubClient.create()) {
      String name = FeatureName.of(projectId, locationId, featureId).toString();

      // Wait for the long-running operation to complete.
      client.deleteFeatureAsync(name).get(10, TimeUnit.MINUTES);
      System.out.println("Feature deleted successfully: " + name);
    }
  }
}
// [END gkehub_v1_gkehub_feature_delete]
