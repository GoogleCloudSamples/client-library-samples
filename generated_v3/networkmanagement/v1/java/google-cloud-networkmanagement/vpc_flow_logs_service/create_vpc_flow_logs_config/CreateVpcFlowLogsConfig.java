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

// [START networkmanagement_v1_vpcflowlogsservice_vpcflowlogsconfig_create]
import com.google.cloud.networkmanagement.v1.CreateVpcFlowLogsConfigRequest;
import com.google.cloud.networkmanagement.v1.VpcFlowLogsConfig;
import com.google.cloud.networkmanagement.v1.VpcFlowLogsServiceClient;
import java.io.IOException;
import java.util.concurrent.ExecutionException;
import java.util.concurrent.TimeUnit;
import java.util.concurrent.TimeoutException;

public class CreateVpcFlowLogsConfig {

  public static void main(String[] args) throws Exception {
    String projectId = "example-project-id";
    String vpcFlowLogsConfigId = "example-flow-logs-config-id";
    // The VPC Flow Logs service is global; the location must be "global".
    String locationId = "global";
    createVpcFlowLogsConfig(projectId, vpcFlowLogsConfigId, locationId);
  }

  public static void createVpcFlowLogsConfig(
      String projectId, String vpcFlowLogsConfigId, String locationId) throws Exception {
    try (VpcFlowLogsServiceClient client = VpcFlowLogsServiceClient.create()) {
      String parent = String.format("projects/%s/locations/%s", projectId, locationId);
      VpcFlowLogsConfig vpcFlowLogsConfig =
          VpcFlowLogsConfig.newBuilder()
              .setState(VpcFlowLogsConfig.State.ENABLED)
              .setNetwork(String.format("projects/%s/global/networks/default", projectId))
              .build();

      CreateVpcFlowLogsConfigRequest request =
          CreateVpcFlowLogsConfigRequest.newBuilder()
              .setParent(parent)
              .setVpcFlowLogsConfigId(vpcFlowLogsConfigId)
              .setVpcFlowLogsConfig(vpcFlowLogsConfig)
              .build();

      // Long-running operation: wait for creation to complete.
      VpcFlowLogsConfig response =
          client.createVpcFlowLogsConfigAsync(request).get(5, TimeUnit.MINUTES);
      System.out.println("Created VPC Flow Logs configuration: " + response.getName());
    }
  }
}
// [END networkmanagement_v1_vpcflowlogsservice_vpcflowlogsconfig_create]
