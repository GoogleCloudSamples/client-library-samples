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

// [START gkehub_v1beta_gkehub_feature_create]
import com.google.cloud.gkehub.v1beta.Feature;
import com.google.cloud.gkehub.v1beta.GkeHubClient;
import java.io.IOException;
import java.util.concurrent.ExecutionException;
import java.util.concurrent.TimeUnit;
import java.util.concurrent.TimeoutException;

public class CreateFeature {

  public static void main(String[] args) throws Exception {
    String projectId = "example-project-id";
    String locationId = "global";
    String featureId = "servicemesh";
    createFeature(projectId, locationId, featureId);
  }

  public static void createFeature(String projectId, String locationId, String featureId)
      throws Exception {
    try (GkeHubClient client = GkeHubClient.create()) {
      String parent = String.format("projects/%s/locations/%s", projectId, locationId);
      Feature resource = Feature.newBuilder()
          .putLabels("env", "test")
          .build();

      // CreateFeature is a long-running operation; block until completion.
      Feature response =
          client.createFeatureAsync(parent, resource, featureId).get(5, TimeUnit.MINUTES);

      System.out.println("Feature created: " + response.getName());
    }
  }
}
// [END gkehub_v1beta_gkehub_feature_create]
