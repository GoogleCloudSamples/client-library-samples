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

// [START monitoring_v3_groupservice_groupmembers_list]
import com.google.api.MonitoredResource;
import com.google.cloud.monitoring.v3.GroupServiceClient;

public class ListGroupMembers {

  public static void main(String[] args) throws Exception {
    String groupId = "example-group_id";
    String projectId = "example-project_id";
    listGroupMembers(groupId, projectId);
  }

  public static void listGroupMembers(String groupId, String projectId) throws Exception {
    try (GroupServiceClient client = GroupServiceClient.create()) {
      String name = String.format("projects/%s/groups/%s", projectId, groupId);

      // List all monitored resources that belong to the specified group
      for (MonitoredResource member : client.listGroupMembers(name).iterateAll()) {
        System.out.println("Monitored resource type: " + member.getType());
        System.out.println("Labels: " + member.getLabelsMap());
      }
    }
  }
}
// [END monitoring_v3_groupservice_groupmembers_list]
