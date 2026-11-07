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

// [START monitoring_v3_groupservice_group_create]
import com.google.cloud.monitoring.v3.GroupServiceClient;
import com.google.monitoring.v3.Group;
import com.google.monitoring.v3.ProjectName;
import java.io.IOException;

public class CreateGroup {

  public static void main(String[] args) throws Exception {
    String projectId = "example-project-id";
    createGroup(projectId);
  }

  public static void createGroup(String projectId) throws Exception {
    // Initialize client that will be closed when the block finishes.
    try (GroupServiceClient client = GroupServiceClient.create()) {
      String name = ProjectName.of(projectId).toString();
      Group group =
          Group.newBuilder()
              .setDisplayName("Sample Group")
              .setFilter("resource.type = \"gce_instance\"")
              .build();

      Group response = client.createGroup(name, group);
      System.out.println("Created group: " + response.getName());
    }
  }
}
// [END monitoring_v3_groupservice_group_create]
