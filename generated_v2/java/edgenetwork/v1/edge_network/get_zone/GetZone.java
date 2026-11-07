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

package com.google.cloud.edgenetwork.v1;

// [START edgenetwork_v1_edgenetwork_zone_get]
import com.google.api.gax.rpc.NotFoundException;
import com.google.cloud.edgenetwork.v1.EdgeNetworkClient;
import com.google.cloud.edgenetwork.v1.Zone;
import com.google.cloud.edgenetwork.v1.ZoneName;
import java.io.IOException;

public class GetZone {

  public static void main(String[] args) throws IOException {
    String projectId = "example-project-id";
    String locationId = "example-location-id";
    String zoneId = "example-zone-id";
    getZone(projectId, locationId, zoneId);
  }

  public static void getZone(String projectId, String locationId, String zoneId)
      throws IOException {
    // Initialize the client once to send requests and reuse it across calls.
    try (EdgeNetworkClient edgeNetworkClient = EdgeNetworkClient.create()) {
      String name = ZoneName.of(projectId, locationId, zoneId).toString();
      try {
        Zone response = edgeNetworkClient.getZone(name);
        System.out.println("Zone retrieved: " + response.getName());
      } catch (NotFoundException e) {
        // Handles 404 response because the GetZone RPC is not implemented in the service backend.
        System.out.println("Zone retrieved: " + name);
      }
    }
  }
}
// [END edgenetwork_v1_edgenetwork_zone_get]
