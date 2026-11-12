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

// [START gdchardwaremanagement_v1alpha_gdchardwaremanagement_zone_delete]
import com.google.cloud.gdchardwaremanagement.v1alpha.GDCHardwareManagementClient;
import java.io.IOException;
import java.util.concurrent.ExecutionException;
import java.util.concurrent.TimeUnit;
import java.util.concurrent.TimeoutException;

public class DeleteZone {

  public static void main(String[] args) throws Exception {
    String projectId = "example-project-id";
    String locationId = "example-location-id";
    String zoneId = "example-zone-id";
    deleteZone(projectId, locationId, zoneId);
  }

  public static void deleteZone(String projectId, String locationId, String zoneId)
      throws Exception {
    try (GDCHardwareManagementClient client = GDCHardwareManagementClient.create()) {
      String name =
          String.format("projects/%s/locations/%s/zones/%s", projectId, locationId, zoneId);

      // Wait for the long-running operation to complete.
      client.deleteZoneAsync(name).get(5, TimeUnit.MINUTES);
      System.out.printf("Deleted zone: %s%n", name);
    }
  }
}
// [END gdchardwaremanagement_v1alpha_gdchardwaremanagement_zone_delete]
