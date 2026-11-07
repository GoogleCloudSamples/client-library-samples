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

// [START gkehub_v1_gkehub_fleet_update]
import com.google.cloud.gkehub.v1.Fleet;
import com.google.cloud.gkehub.v1.FleetName;
import com.google.cloud.gkehub.v1.GkeHubClient;
import com.google.protobuf.FieldMask;
import java.io.IOException;
import java.util.concurrent.ExecutionException;
import java.util.concurrent.TimeUnit;
import java.util.concurrent.TimeoutException;

public class UpdateFleet {

  public static void main(String[] args) throws Exception {
    String projectId = "example-project_id";
    String locationId = "example-location_id";
    String fleetId = "example-fleet_id";
    updateFleet(projectId, locationId, fleetId);
  }

  public static void updateFleet(String projectId, String locationId, String fleetId)
      throws Exception {
    try (GkeHubClient client = GkeHubClient.create()) {
      Fleet fleet =
          Fleet.newBuilder()
              .setName(FleetName.of(projectId, locationId, fleetId).toString())
              .setDisplayName("Updated Fleet")
              .build();

      FieldMask updateMask = FieldMask.newBuilder().addPaths("display_name").build();

      // Initiate the long-running operation and wait for completion.
      Fleet response = client.updateFleetAsync(fleet, updateMask).get(5, TimeUnit.MINUTES);

      System.out.println("Updated fleet: " + response.getName());
      System.out.println("Display name: " + response.getDisplayName());
    }
  }
}
// [END gkehub_v1_gkehub_fleet_update]
