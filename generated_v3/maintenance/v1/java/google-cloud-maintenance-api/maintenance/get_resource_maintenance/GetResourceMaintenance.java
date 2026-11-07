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

package com.google.cloud.maintenance.v1;

// [START maintenance_v1_maintenance_resourcemaintenance_get]
import com.google.cloud.maintenance.api.v1.GetResourceMaintenanceRequest;
import com.google.cloud.maintenance.api.v1.MaintenanceClient;
import com.google.cloud.maintenance.api.v1.ResourceMaintenance;
import com.google.cloud.maintenance.api.v1.ResourceMaintenanceName;
import java.io.IOException;

public class GetResourceMaintenance {

  public static void main(String[] args) throws IOException {
    String projectId = "example-project-id";
    String locationId = "example-location-id";
    String resourceMaintenanceId = "example-resource-maintenance-id";
    getResourceMaintenance(projectId, locationId, resourceMaintenanceId);
  }

  public static void getResourceMaintenance(
      String projectId, String locationId, String resourceMaintenanceId) throws IOException {
    // Initialize client that will be closed when the try block completes.
    try (MaintenanceClient client = MaintenanceClient.create()) {
      String name =
          ResourceMaintenanceName.of(projectId, locationId, resourceMaintenanceId).toString();

      GetResourceMaintenanceRequest request =
          GetResourceMaintenanceRequest.newBuilder().setName(name).build();

      ResourceMaintenance response = client.getResourceMaintenance(request);
      System.out.println("Retrieved resource maintenance: " + response.getName());
    }
  }
}
// [END maintenance_v1_maintenance_resourcemaintenance_get]
