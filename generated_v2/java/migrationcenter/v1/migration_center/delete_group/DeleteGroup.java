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

// [START migrationcenter_v1_migrationcenter_group_delete]
import com.google.cloud.migrationcenter.v1.GroupName;
import com.google.cloud.migrationcenter.v1.MigrationCenterClient;
import java.io.IOException;
import java.util.concurrent.ExecutionException;
import java.util.concurrent.TimeUnit;
import java.util.concurrent.TimeoutException;

public class DeleteGroup {

  public static void main(String[] args) throws Exception {
    String projectId = "example-project_id";
    String locationId = "example-location_id";
    String groupId = "example-group_id";
    deleteGroup(projectId, locationId, groupId);
  }

  public static void deleteGroup(String projectId, String locationId, String groupId) throws Exception {
    try (MigrationCenterClient client = MigrationCenterClient.create()) {
      String name = GroupName.of(projectId, locationId, groupId).toString();

      // DeleteGroup is a long-running operation; wait for it to complete.
      client.deleteGroupAsync(name).get(5, TimeUnit.MINUTES);
      System.out.println("Deleted group: " + name);
    }
  }
}
// [END migrationcenter_v1_migrationcenter_group_delete]
