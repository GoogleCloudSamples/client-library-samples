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

// [START gkehub_v1alpha_gkehub_features_list]
import com.google.cloud.gkehub.v1alpha.Feature;
import com.google.cloud.gkehub.v1alpha.GkeHubClient;

public class ListFeatures {

  public static void main(String[] args) throws Exception {
    String projectId = "example-project-id";
    String locationId = "global";
    listFeatures(projectId, locationId);
  }

  public static void listFeatures(String projectId, String locationId) throws Exception {
    try (GkeHubClient client = GkeHubClient.create()) {
      String parent = String.format("projects/%s/locations/%s", projectId, locationId);
      for (Feature feature : client.listFeatures(parent).iterateAll()) {
        System.out.println("Feature name: " + feature.getName());
      }
    }
  }
}
// [END gkehub_v1alpha_gkehub_features_list]
