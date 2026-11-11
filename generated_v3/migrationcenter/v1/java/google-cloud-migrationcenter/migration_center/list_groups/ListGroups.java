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

// [START migrationcenter_v1_migrationcenter_groups_list]
import com.google.cloud.migrationcenter.v1.Group;
import com.google.cloud.migrationcenter.v1.ListGroupsRequest;
import com.google.cloud.migrationcenter.v1.LocationName;
import com.google.cloud.migrationcenter.v1.MigrationCenterClient;
import java.io.IOException;

public class ListGroups {

  public static void main(String[] args) throws Exception {
    String projectId = "example-project-id";
    String locationId = "example-location-id";
    listGroups(projectId, locationId);
  }

  public static void listGroups(String projectId, String locationId) throws Exception {
    try (MigrationCenterClient client = MigrationCenterClient.create()) {
      String parent = LocationName.of(projectId, locationId).toString();
      ListGroupsRequest request = ListGroupsRequest.newBuilder().setParent(parent).build();

      for (Group group : client.listGroups(request).iterateAll()) {
        System.out.println("Group name: " + group.getName());
        System.out.println("Display name: " + group.getDisplayName());
        System.out.println("Description: " + group.getDescription());
      }
    }
  }
}
// [END migrationcenter_v1_migrationcenter_groups_list]
