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

// [START vmmigration_v1_vmmigration_migratingvms_list]
import com.google.cloud.vmmigration.v1.MigratingVm;
import com.google.cloud.vmmigration.v1.SourceName;
import com.google.cloud.vmmigration.v1.VmMigrationClient;

public class ListMigratingVms {

  public static void main(String[] args) throws Exception {
    // TODO(developer): Replace these variables before running the sample.
    String projectId = "example-project_id";
    String locationId = "example-location_id";
    String sourceId = "example-source_id";
    listMigratingVms(projectId, locationId, sourceId);
  }

  public static void listMigratingVms(String projectId, String locationId, String sourceId)
      throws Exception {
    // Initialize the client that will be used to send requests.
    // The client only needs to be created once, and can be reused for multiple requests.
    try (VmMigrationClient client = VmMigrationClient.create()) {
      String parent = SourceName.of(projectId, locationId, sourceId).toString();

      for (MigratingVm migratingVm : client.listMigratingVms(parent).iterateAll()) {
        System.out.println("Migrating VM name: " + migratingVm.getName());
      }
    }
  }
}
// [END vmmigration_v1_vmmigration_migratingvms_list]
