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

// [START geminidataanalytics_v1beta_dataagentservice_dataagentsync_update]
import com.google.cloud.geminidataanalytics.v1beta.DataAgent;
import com.google.cloud.geminidataanalytics.v1beta.DataAgentServiceClient;
import com.google.protobuf.FieldMask;
import java.io.IOException;

public class UpdateDataAgentSync {

  public static void main(String[] args) throws Exception {
    String projectId = "example-project_id";
    String locationId = "example-location_id";
    String dataAgentId = "example-data_agent_id";
    updateDataAgentSync(projectId, locationId, dataAgentId);
  }

  public static void updateDataAgentSync(
      String projectId, String locationId, String dataAgentId) throws Exception {
    try (DataAgentServiceClient client = DataAgentServiceClient.create()) {
      DataAgent dataAgent =
          DataAgent.newBuilder()
              .setName(
                  String.format(
                      "projects/%s/locations/%s/dataAgents/%s",
                      projectId, locationId, dataAgentId))
              .setDescription("Updated description for the data agent.")
              .build();
      FieldMask updateMask = FieldMask.newBuilder().addPaths("description").build();

      DataAgent response = client.updateDataAgentSync(dataAgent, updateMask);
      System.out.println("Updated data agent: " + response.getName());
    }
  }
}
// [END geminidataanalytics_v1beta_dataagentservice_dataagentsync_update]
