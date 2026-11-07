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

// [START gkehub_v1_gkehub_fleet_get]
import com.google.cloud.gkehub.v1.Fleet;
import com.google.cloud.gkehub.v1.FleetName;
import com.google.cloud.gkehub.v1.GkeHubClient;

public class GetFleet {

  public static void main(String[] args) throws Exception {
    String projectId = "example-project_id";
    String locationId = "example-location_id";
    String fleetId = "example-fleet_id";
    getFleet(projectId, locationId, fleetId);
  }

  public static void getFleet(String projectId, String locationId, String fleetId)
      throws Exception {
    // Initialize client that will be closed when the block finishes
    try (GkeHubClient client = GkeHubClient.create()) {
      String name = FleetName.of(projectId, locationId, fleetId).toString();

      Fleet fleet = client.getFleet(name);

      System.out.println("Fleet name: " + fleet.getName());
      System.out.println("Fleet display name: " + fleet.getDisplayName());
    }
  }
}
// [END gkehub_v1_gkehub_fleet_get]
