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

// [START dataplex_v1_dataplexservice_zone_update]
import com.google.cloud.dataplex.v1.DataplexServiceClient;
import com.google.cloud.dataplex.v1.Zone;
import com.google.cloud.dataplex.v1.ZoneName;
import com.google.protobuf.FieldMask;
import java.io.IOException;
import java.util.concurrent.ExecutionException;
import java.util.concurrent.TimeUnit;
import java.util.concurrent.TimeoutException;

public class UpdateZone {

  public static void main(String[] args) throws Exception {
    String projectId = "example-project_id";
    String locationId = "example-location_id";
    String lakeId = "example-lake_id";
    String zoneId = "example-zone_id";
    updateZone(projectId, locationId, lakeId, zoneId);
  }

  public static void updateZone(String projectId, String locationId, String lakeId, String zoneId)
      throws Exception {
    // Initialize client that will be used to send requests. This client only needs to be created
    // once, and can be reused for multiple requests.
    try (DataplexServiceClient client = DataplexServiceClient.create()) {
      Zone zone =
          Zone.newBuilder()
              .setName(ZoneName.of(projectId, locationId, lakeId, zoneId).toString())
              .setDescription("Updated zone description")
              .build();
      FieldMask updateMask = FieldMask.newBuilder().addPaths("description").build();

      // UpdateZone is a long-running operation. Initiate the update and wait for completion.
      Zone response = client.updateZoneAsync(zone, updateMask).get(5, TimeUnit.MINUTES);
      System.out.println("Zone updated successfully: " + response.getName());
      System.out.println("Description: " + response.getDescription());
    }
  }
}
// [END dataplex_v1_dataplexservice_zone_update]
