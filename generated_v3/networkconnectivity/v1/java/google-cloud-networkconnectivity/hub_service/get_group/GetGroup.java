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

// [START networkconnectivity_v1_hubservice_group_get]
import com.google.cloud.networkconnectivity.v1.Group;
import com.google.cloud.networkconnectivity.v1.GroupName;
import com.google.cloud.networkconnectivity.v1.HubServiceClient;
import java.io.IOException;

public class GetGroup {

  public static void main(String[] args) throws IOException {
    String projectId = "example-project-id";
    String hubId = "example-hub-id";
    String groupId = "example-group-id";
    getGroup(projectId, hubId, groupId);
  }

  public static void getGroup(String projectId, String hubId, String groupId) throws IOException {
    // Initialize client that will be automatically closed when the try-with-resources block exits.
    try (HubServiceClient hubServiceClient = HubServiceClient.create()) {
      String name = GroupName.of(projectId, hubId, groupId).toString();
      Group response = hubServiceClient.getGroup(name);
      System.out.println("Group: " + response.getName());
      System.out.println("Group name: " + response.getName());
      System.out.println("Group state: " + response.getState());
    }
  }
}
// [END networkconnectivity_v1_hubservice_group_get]
