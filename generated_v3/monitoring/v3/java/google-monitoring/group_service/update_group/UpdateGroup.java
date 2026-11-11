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

package com.google.cloud.monitoring.v3;

// [START monitoring_v3_groupservice_group_update]
import com.google.cloud.monitoring.v3.GroupServiceClient;
import com.google.monitoring.v3.Group;
import com.google.monitoring.v3.GroupName;

public class UpdateGroup {

  public static void main(String[] args) throws Exception {
    String projectId = "example-project-id";
    String groupId = "example-group-id";
    updateGroup(projectId, groupId);
  }

  public static void updateGroup(String projectId, String groupId) throws Exception {
    try (GroupServiceClient client = GroupServiceClient.create()) {
      GroupName name = GroupName.of(projectId, groupId);
      // Retrieve the existing group because updateGroup performs a full replacement
      Group existingGroup = client.getGroup(name);
      Group group = existingGroup.toBuilder().setDisplayName("Updated Group Name").build();

      Group response = client.updateGroup(group);
      System.out.println("Updated group: " + response.getName());
      System.out.println("Display name: " + response.getDisplayName());
    }
  }
}
// [END monitoring_v3_groupservice_group_update]
