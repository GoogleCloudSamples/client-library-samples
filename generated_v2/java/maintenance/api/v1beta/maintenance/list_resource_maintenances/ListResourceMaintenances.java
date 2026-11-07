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

package com.google.cloud.maintenance.v1beta;

// [START maintenance_v1beta_maintenance_resourcemaintenances_list]
import com.google.cloud.maintenance.api.v1beta.MaintenanceClient;
import com.google.cloud.maintenance.api.v1beta.ResourceMaintenance;
import java.io.IOException;

public class ListResourceMaintenances {

  public static void main(String[] args) throws IOException {
    String projectId = "example-project-id";
    String locationId = "example-location-id";
    listResourceMaintenances(projectId, locationId);
  }

  public static void listResourceMaintenances(String projectId, String locationId)
      throws IOException {
    String parent = String.format("projects/%s/locations/%s", projectId, locationId);
    try (MaintenanceClient maintenanceClient = MaintenanceClient.create()) {
      for (ResourceMaintenance resourceMaintenance :
          maintenanceClient.listResourceMaintenances(parent).iterateAll()) {
        System.out.println("Resource maintenance: " + resourceMaintenance.getName());
      }
    }
  }
}
// [END maintenance_v1beta_maintenance_resourcemaintenances_list]
