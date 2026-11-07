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

// [START migrationcenter_v1_migrationcenter_group_create]
import com.google.cloud.migrationcenter.v1.Group;
import com.google.cloud.migrationcenter.v1.MigrationCenterClient;
import java.io.IOException;
import java.util.concurrent.ExecutionException;
import java.util.concurrent.TimeUnit;
import java.util.concurrent.TimeoutException;

public class CreateGroup {

  public static void main(String[] args) throws Exception {
    String groupId = "example-group-id";
    String projectId = "example-project-id";
    String locationId = "example-location-id";
    createGroup(groupId, projectId, locationId);
  }

  public static void createGroup(String groupId, String projectId, String locationId)
      throws Exception {
    try (MigrationCenterClient client = MigrationCenterClient.create()) {
      String parent = String.format("projects/%s/locations/%s", projectId, locationId);
      Group group =
          Group.newBuilder()
              .setDisplayName("Example Group")
              .setDescription("Example group description")
              .build();

      // Initiate the operation and wait for completion
      Group response = client.createGroupAsync(parent, group, groupId).get(5, TimeUnit.MINUTES);

      System.out.println("Created group: " + response.getName());
    }
  }
}
// [END migrationcenter_v1_migrationcenter_group_create]
