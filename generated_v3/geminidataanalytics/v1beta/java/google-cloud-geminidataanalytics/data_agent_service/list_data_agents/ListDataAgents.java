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

package com.google.cloud.geminidataanalytics.v1beta;

// [START geminidataanalytics_v1beta_dataagentservice_dataagents_list]
import com.google.cloud.geminidataanalytics.v1beta.DataAgent;
import com.google.cloud.geminidataanalytics.v1beta.DataAgentServiceClient;

public class ListDataAgents {

  public static void main(String[] args) throws Exception {
    String projectId = "example-project-id";
    String locationId = "example-location-id";
    listDataAgents(projectId, locationId);
  }

  public static void listDataAgents(String projectId, String locationId) throws Exception {
    try (DataAgentServiceClient client = DataAgentServiceClient.create()) {
      String parent = String.format("projects/%s/locations/%s", projectId, locationId);

      for (DataAgent dataAgent : client.listDataAgents(parent).iterateAll()) {
        System.out.println("Data Agent: " + dataAgent.getName());
      }
    }
  }
}
// [END geminidataanalytics_v1beta_dataagentservice_dataagents_list]
