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

// [START networkconnectivity_v1alpha1_hubservice_hub_get]
import com.google.cloud.networkconnectivity.v1alpha1.Hub;
import com.google.cloud.networkconnectivity.v1alpha1.HubName;
import com.google.cloud.networkconnectivity.v1alpha1.HubServiceClient;
import java.io.IOException;

public class GetHub {

  public static void main(String[] args) throws Exception {
    String projectId = "example-project_id";
    String hubId = "example-hub_id";
    getHub(projectId, hubId);
  }

  public static void getHub(String projectId, String hubId) throws Exception {
    try (HubServiceClient client = HubServiceClient.create()) {
      String name = HubName.of(projectId, hubId).toString();
      Hub response = client.getHub(name);

      System.out.println("Hub retrieved successfully: " + response.getName());
      System.out.println("State: " + response.getState());
      System.out.println("Description: " + response.getDescription());
    }
  }
}
// [END networkconnectivity_v1alpha1_hubservice_hub_get]
