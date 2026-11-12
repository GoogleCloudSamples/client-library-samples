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

// [START gkehub_v1_gkehub_features_list]
import com.google.cloud.gkehub.v1.Feature;
import com.google.cloud.gkehub.v1.GkeHubClient;
import java.io.IOException;

public class ListFeatures {

  public static void main(String[] args) throws IOException {
    listFeatures();
  }

  public static void listFeatures() throws IOException {
    // Scope the list request to the target project and location.
    String projectId = System.getenv("GOOGLE_CLOUD_PROJECT");
    String location = "global";
    String parent = String.format("projects/%s/locations/%s", projectId, location);

    // Initialize the client in a try-with-resources statement to release resources upon completion.
    try (GkeHubClient client = GkeHubClient.create()) {
      for (Feature feature : client.listFeatures(parent).iterateAll()) {
        System.out.println("Feature name: " + feature.getName());
        System.out.println("Create time: " + feature.getCreateTime());
      }
    }
  }
}
// [END gkehub_v1_gkehub_features_list]
