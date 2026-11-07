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

// [START monitoring_v3_groupservice_groups_list]
import com.google.cloud.monitoring.v3.GroupServiceClient;
import com.google.monitoring.v3.Group;
import com.google.monitoring.v3.ProjectName;

public class ListGroups {

  public static void main(String[] args) throws Exception {
    String projectId = "example-project_id";
    listGroups(projectId);
  }

  public static void listGroups(String projectId) throws Exception {
    try (GroupServiceClient client = GroupServiceClient.create()) {
      String name = ProjectName.of(projectId).toString();

      for (Group group : client.listGroups(name).iterateAll()) {
        System.out.println("Group name: " + group.getName());
        System.out.println("Display name: " + group.getDisplayName());
      }
    }
  }
}
// [END monitoring_v3_groupservice_groups_list]
