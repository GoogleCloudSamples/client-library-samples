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

package com.google.cloud.networkconnectivity.v1alpha1;

// [START networkconnectivity_v1alpha1_hubservice_hub_create]
import com.google.cloud.networkconnectivity.v1alpha1.Hub;
import com.google.cloud.networkconnectivity.v1alpha1.HubServiceClient;
import java.io.IOException;
import java.util.concurrent.ExecutionException;
import java.util.concurrent.TimeUnit;
import java.util.concurrent.TimeoutException;

public class CreateHub {

  public static void main(String[] args) throws Exception {
    String projectId = "example-project_id";
    String hubId = "example-hub_id";
    createHub(projectId, hubId);
  }

  public static void createHub(String projectId, String hubId) throws Exception {
    try (HubServiceClient client = HubServiceClient.create()) {
      String parent = String.format("projects/%s/locations/global", projectId);
      Hub hub = Hub.newBuilder()
          .setDescription("Sample Network Connectivity Hub")
          .build();

      // CreateHub is a long-running operation; wait for resolution
      Hub response = client.createHubAsync(parent, hub, hubId).get(5, TimeUnit.MINUTES);
      System.out.println("Created hub: " + response.getName());
    }
  }
}
// [END networkconnectivity_v1alpha1_hubservice_hub_create]
