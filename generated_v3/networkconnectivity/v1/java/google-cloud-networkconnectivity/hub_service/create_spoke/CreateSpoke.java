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

// [START networkconnectivity_v1_hubservice_spoke_create]
import com.google.cloud.networkconnectivity.v1.HubServiceClient;
import com.google.cloud.networkconnectivity.v1.LinkedVpcNetwork;
import com.google.cloud.networkconnectivity.v1.Spoke;

public class CreateSpoke {

  public static void main(String[] args) throws Exception {
    String spokeId = "example-spoke_id";
    String projectId = "example-project_id";
    String locationId = "example-location_id";
    String hubId = "example-hub_id";
    String networkId = "example-network_id";
    createSpoke(spokeId, projectId, locationId, hubId, networkId);
  }

  public static void createSpoke(
      String spokeId, String projectId, String locationId, String hubId, String networkId)
      throws Exception {
    try (HubServiceClient client = HubServiceClient.create()) {
      String parent = String.format("projects/%s/locations/%s", projectId, locationId);
      String hub = String.format("projects/%s/locations/global/hubs/%s", projectId, hubId);
      String networkUri = String.format("projects/%s/global/networks/%s", projectId, networkId);

      LinkedVpcNetwork linkedVpcNetwork =
          LinkedVpcNetwork.newBuilder().setUri(networkUri).build();

      Spoke spoke =
          Spoke.newBuilder()
              .setHub(hub)
              .setLinkedVpcNetwork(linkedVpcNetwork)
              .setDescription("VPC spoke")
              .build();

      // Initialize the operation and wait for completion
      Spoke response = client.createSpokeAsync(parent, spoke, spokeId).get();
      System.out.println("Created spoke: " + response.getName());
    }
  }
}
// [END networkconnectivity_v1_hubservice_spoke_create]
