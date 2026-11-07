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

package com.google.cloud.networkconnectivity.v1;

// [START networkconnectivity_v1_hubservice_group_update]
import com.google.cloud.networkconnectivity.v1.Group;
import com.google.cloud.networkconnectivity.v1.GroupName;
import com.google.cloud.networkconnectivity.v1.HubServiceClient;
import com.google.protobuf.FieldMask;
import java.io.IOException;
import java.util.concurrent.ExecutionException;
import java.util.concurrent.TimeUnit;
import java.util.concurrent.TimeoutException;

public class UpdateGroup {

  public static void main(String[] args) throws Exception {
    String projectId = "example-project_id";
    String hubId = "example-hub_id";
    String groupId = "example-group_id";
    updateGroup(projectId, hubId, groupId);
  }

  public static void updateGroup(String projectId, String hubId, String groupId) throws Exception {
    try (HubServiceClient client = HubServiceClient.create()) {
      Group group =
          Group.newBuilder()
              .setName(GroupName.of(projectId, hubId, groupId).toString())
              .setDescription("Updated hub group description")
              .build();
      FieldMask updateMask = FieldMask.newBuilder().addPaths("description").build();

      // UpdateGroup is a long-running operation; wait for operation completion.
      Group response = client.updateGroupAsync(group, updateMask).get(5, TimeUnit.MINUTES);
      System.out.println("Updated group: " + response.getName());
    }
  }
}
// [END networkconnectivity_v1_hubservice_group_update]
