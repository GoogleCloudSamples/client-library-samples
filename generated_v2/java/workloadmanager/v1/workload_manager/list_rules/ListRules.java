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

package com.google.cloud.workloadmanager.v1;

// [START workloadmanager_v1_workloadmanager_rules_list]
import com.google.cloud.workloadmanager.v1.Rule;
import com.google.cloud.workloadmanager.v1.WorkloadManagerClient;
import java.io.IOException;

public class ListRules {

  public static void main(String[] args) throws Exception {
    String projectId = "example-project-id";
    String locationId = "example-location-id";
    listRules(projectId, locationId);
  }

  public static void listRules(String projectId, String locationId) throws IOException {
    try (WorkloadManagerClient client = WorkloadManagerClient.create()) {
      String parent = String.format("projects/%s/locations/%s", projectId, locationId);

      for (Rule rule : client.listRules(parent).getRulesList()) {
        System.out.println("Rule: " + rule.getName());
      }
    }
  }
}
// [END workloadmanager_v1_workloadmanager_rules_list]
