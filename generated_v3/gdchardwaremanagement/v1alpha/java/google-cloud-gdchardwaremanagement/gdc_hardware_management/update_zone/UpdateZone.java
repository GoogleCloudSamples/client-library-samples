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

package com.google.cloud.gdchardwaremanagement.v1alpha;

// [START gdchardwaremanagement_v1alpha_gdchardwaremanagement_zone_update]
import com.google.cloud.gdchardwaremanagement.v1alpha.GDCHardwareManagementClient;
import com.google.cloud.gdchardwaremanagement.v1alpha.Zone;
import com.google.protobuf.FieldMask;
import java.io.IOException;
import java.util.concurrent.ExecutionException;
import java.util.concurrent.TimeUnit;
import java.util.concurrent.TimeoutException;

public class UpdateZone {

  public static void main(String[] args) throws Exception {
    String projectId = "example-project_id";
    String locationId = "example-location_id";
    String zoneId = "example-zone_id";
    updateZone(projectId, locationId, zoneId);
  }

  public static void updateZone(String projectId, String locationId, String zoneId)
      throws Exception {
    try (GDCHardwareManagementClient client = GDCHardwareManagementClient.create()) {
      Zone zone =
          Zone.newBuilder()
              .setName(
                  String.format("projects/%s/locations/%s/zones/%s", projectId, locationId, zoneId))
              .setDisplayName("Updated Zone Display Name")
              .build();
      FieldMask updateMask = FieldMask.newBuilder().addPaths("display_name").build();

      Zone response = client.updateZoneAsync(zone, updateMask).get(5, TimeUnit.MINUTES);
      System.out.println("Zone updated successfully: " + response.getName());
    }
  }
}
// [END gdchardwaremanagement_v1alpha_gdchardwaremanagement_zone_update]
