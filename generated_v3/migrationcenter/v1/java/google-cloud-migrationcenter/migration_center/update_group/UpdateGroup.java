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

package com.google.cloud.migrationcenter.v1;

// [START migrationcenter_v1_migrationcenter_group_update]
import com.google.cloud.migrationcenter.v1.Group;
import com.google.cloud.migrationcenter.v1.GroupName;
import com.google.cloud.migrationcenter.v1.MigrationCenterClient;
import com.google.protobuf.FieldMask;

public class UpdateGroup {

  public static void main(String[] args) throws Exception {
    String projectId = "example-project_id";
    String locationId = "example-location_id";
    String groupId = "example-group_id";
    updateGroup(projectId, locationId, groupId);
  }

  public static void updateGroup(String projectId, String locationId, String groupId)
      throws Exception {
    try (MigrationCenterClient client = MigrationCenterClient.create()) {
      FieldMask updateMask = FieldMask.newBuilder().addPaths("display_name").build();
      Group group =
          Group.newBuilder()
              .setName(GroupName.of(projectId, locationId, groupId).toString())
              .setDisplayName("Updated Group Display Name")
              .build();

      // UpdateGroup is a long-running operation; wait for it to complete.
      Group response = client.updateGroupAsync(group, updateMask).get();
      System.out.println("Updated group: " + response.getName());
      System.out.println("Updated display name: " + response.getDisplayName());
    }
  }
}
// [END migrationcenter_v1_migrationcenter_group_update]
