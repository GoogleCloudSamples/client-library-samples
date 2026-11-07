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

package com.google.cloud.vmmigration.v1;

// [START vmmigration_v1_vmmigration_datacenterconnectors_list]
import com.google.cloud.vmmigration.v1.DatacenterConnector;
import com.google.cloud.vmmigration.v1.SourceName;
import com.google.cloud.vmmigration.v1.VmMigrationClient;

public class ListDatacenterConnectors {

  public static void main(String[] args) throws Exception {
    String projectId = "example-project_id";
    String locationId = "example-location_id";
    String sourceId = "example-source_id";
    listDatacenterConnectors(projectId, locationId, sourceId);
  }

  public static void listDatacenterConnectors(String projectId, String locationId, String sourceId)
      throws Exception {
    try (VmMigrationClient client = VmMigrationClient.create()) {
      String parent = SourceName.of(projectId, locationId, sourceId).toString();

      for (DatacenterConnector connector : client.listDatacenterConnectors(parent).iterateAll()) {
        System.out.println("Datacenter connector: " + connector.getName());
        System.out.println("State: " + connector.getState());
      }
    }
  }
}
// [END vmmigration_v1_vmmigration_datacenterconnectors_list]
