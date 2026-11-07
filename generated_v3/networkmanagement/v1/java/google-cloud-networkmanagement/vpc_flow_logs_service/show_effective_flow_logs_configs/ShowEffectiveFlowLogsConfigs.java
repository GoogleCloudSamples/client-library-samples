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

package com.google.cloud.networkmanagement.v1;

// [START networkmanagement_v1_vpcflowlogsservice_show_effective_flow_logs_configs]
import com.google.cloud.networkmanagement.v1.EffectiveVpcFlowLogsConfig;
import com.google.cloud.networkmanagement.v1.ShowEffectiveFlowLogsConfigsRequest;
import com.google.cloud.networkmanagement.v1.VpcFlowLogsServiceClient;
import java.io.IOException;

public class ShowEffectiveFlowLogsConfigs {

  public static void main(String[] args) throws Exception {
    // TODO(developer): Replace these variables before running the sample.
    String projectId = "example-project-id";
    String resource = "projects/example-project-id/global/networks/default";
    showEffectiveFlowLogsConfigs(projectId, resource);
  }

  // Shows effective VPC Flow Logs configurations for a target resource.
  public static void showEffectiveFlowLogsConfigs(String projectId, String resource)
      throws Exception {
    try (VpcFlowLogsServiceClient client = VpcFlowLogsServiceClient.create()) {
      String parent = String.format("projects/%s/locations/global", projectId);

      ShowEffectiveFlowLogsConfigsRequest request =
          ShowEffectiveFlowLogsConfigsRequest.newBuilder()
              .setParent(parent)
              .setResource(resource)
              .build();

      // Retrieve and print all effective VPC Flow Logs configurations applied to the resource.
      for (EffectiveVpcFlowLogsConfig config :
          client.showEffectiveFlowLogsConfigs(request).iterateAll()) {
        System.out.println("Effective Flow Logs Config: " + config.getName());
      }
    }
  }
}
// [END networkmanagement_v1_vpcflowlogsservice_show_effective_flow_logs_configs]
