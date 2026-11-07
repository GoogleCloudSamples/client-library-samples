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

// [START monitoring_v3_groupservice_group_delete]
import com.google.cloud.monitoring.v3.GroupServiceClient;
import com.google.monitoring.v3.GroupName;
import java.io.IOException;

public class DeleteGroup {

  public static void main(String[] args) throws Exception {
    // TODO(developer): Replace these variables before running the sample.
    String groupId = "example-group-id";
    String projectId = "example-project-id";
    deleteGroup(groupId, projectId);
  }

  public static void deleteGroup(String groupId, String projectId) throws Exception {
    // Initialize client that will be automatically closed after use.
    try (GroupServiceClient client = GroupServiceClient.create()) {
      String name = GroupName.of(projectId, groupId).toString();
      client.deleteGroup(name);
      System.out.println("Deleted group: " + name);
    }
  }
}
// [END monitoring_v3_groupservice_group_delete]
