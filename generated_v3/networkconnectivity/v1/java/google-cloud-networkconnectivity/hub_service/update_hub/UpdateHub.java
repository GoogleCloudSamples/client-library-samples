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

package com.google.cloud.networkconnectivity.v1;

// [START networkconnectivity_v1_hubservice_hub_update]
import com.google.cloud.networkconnectivity.v1.Hub;
import com.google.cloud.networkconnectivity.v1.HubName;
import com.google.cloud.networkconnectivity.v1.HubServiceClient;
import com.google.protobuf.FieldMask;
import java.util.concurrent.TimeUnit;

public class UpdateHub {

  public static void main(String[] args) throws Exception {
    String projectId = "example-project-id";
    String hubId = "example-hub-id";
    updateHub(projectId, hubId);
  }

  public static void updateHub(String projectId, String hubId) throws Exception {
    try (HubServiceClient client = HubServiceClient.create()) {
      FieldMask updateMask = FieldMask.newBuilder().addPaths("description").build();
      Hub hub =
          Hub.newBuilder()
              .setName(HubName.of(projectId, hubId).toString())
              .setDescription("Updated hub description")
              .build();

      // Initiate the update operation and wait for completion.
      Hub response = client.updateHubAsync(hub, updateMask).get(5, TimeUnit.MINUTES);
      System.out.println("Updated Hub: " + response.getName());
      System.out.println("Description: " + response.getDescription());
    }
  }
}
// [END networkconnectivity_v1_hubservice_hub_update]
