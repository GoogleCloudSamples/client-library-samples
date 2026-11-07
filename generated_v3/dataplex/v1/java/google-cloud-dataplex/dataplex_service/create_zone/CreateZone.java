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

package com.google.cloud.dataplex.v1;

// [START dataplex_v1_dataplexservice_zone_create]
import com.google.cloud.dataplex.v1.DataplexServiceClient;
import com.google.cloud.dataplex.v1.Zone;

public class CreateZone {

  public static void main(String[] args) throws Exception {
    String locationId = "example-location_id";
    String lakeId = "example-lake_id";
    String zoneId = "example-zone_id";
    String projectId = "example-project_id";
    createZone(locationId, lakeId, zoneId, projectId);
  }

  public static void createZone(String locationId, String lakeId, String zoneId, String projectId)
      throws Exception {
    try (DataplexServiceClient client = DataplexServiceClient.create()) {
      String parent = String.format("projects/%s/locations/%s/lakes/%s", projectId, locationId, lakeId);

      Zone.ResourceSpec resourceSpec =
          Zone.ResourceSpec.newBuilder()
              .setLocationType(Zone.ResourceSpec.LocationType.SINGLE_REGION)
              .build();

      Zone zone =
          Zone.newBuilder()
              .setType(Zone.Type.RAW)
              .setResourceSpec(resourceSpec)
              .build();

      // CreateZone is a long-running operation; block until creation completes
      Zone createdZone = client.createZoneAsync(parent, zone, zoneId).get();
      System.out.println("Zone created successfully: " + createdZone.getName());
    }
  }
}
// [END dataplex_v1_dataplexservice_zone_create]
