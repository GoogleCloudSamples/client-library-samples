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

package com.google.cloud.networkconnectivity.v1beta;

// [START networkconnectivity_v1beta_hubservice_group_get]
import com.google.cloud.networkconnectivity.v1beta.Group;
import com.google.cloud.networkconnectivity.v1beta.GroupName;
import com.google.cloud.networkconnectivity.v1beta.HubServiceClient;
import java.io.IOException;

public class GetGroup {

  public static void main(String[] args) throws Exception {
    String projectId = "example-project_id";
    String hubId = "example-hub_id";
    String groupId = "example-group_id";
    getGroup(projectId, hubId, groupId);
  }

  public static void getGroup(String projectId, String hubId, String groupId) throws Exception {
    // Initialize client that will be used to send requests. This client only needs to be created
    // once, and can be reused for multiple requests.
    try (HubServiceClient client = HubServiceClient.create()) {
      String name = GroupName.of(projectId, hubId, groupId).toString();
      Group response = client.getGroup(name);
      System.out.println("Retrieved group: " + response.getName());
    }
  }
}
// [END networkconnectivity_v1beta_hubservice_group_get]
