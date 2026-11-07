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

// [START vmmigration_v1_vmmigration_group_get]
import com.google.cloud.vmmigration.v1.Group;
import com.google.cloud.vmmigration.v1.GroupName;
import com.google.cloud.vmmigration.v1.VmMigrationClient;

public class GetGroup {

  public static void main(String[] args) throws Exception {
    String projectId = "example-project-id";
    String locationId = "example-location-id";
    String groupId = "example-group-id";
    getGroup(projectId, locationId, groupId);
  }

  public static void getGroup(String projectId, String locationId, String groupId)
      throws Exception {
    try (VmMigrationClient client = VmMigrationClient.create()) {
      String name = GroupName.of(projectId, locationId, groupId).toString();
      Group response = client.getGroup(name);
      System.out.println("Retrieved group: " + response.getName());
      System.out.println("Description: " + response.getDescription());
    }
  }
}
// [END vmmigration_v1_vmmigration_group_get]
