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

package com.google.cloud.networkmanagement.v1beta1;

// [START networkmanagement_v1beta1_vpcflowlogsservice_query_org_vpc_flow_logs_configs]
import com.google.cloud.networkmanagement.v1beta1.QueryOrgVpcFlowLogsConfigsRequest;
import com.google.cloud.networkmanagement.v1beta1.VpcFlowLogsConfig;
import com.google.cloud.networkmanagement.v1beta1.VpcFlowLogsServiceClient;

public class QueryOrgVpcFlowLogsConfigs {

  public static void main(String[] args) throws Exception {
    String projectId = "example-project-id";
    // Organization-level VPC Flow Logs configurations are global resources.
    String locationId = "global";
    queryOrgVpcFlowLogsConfigs(projectId, locationId);
  }

  public static void queryOrgVpcFlowLogsConfigs(String projectId, String locationId)
      throws Exception {
    try (VpcFlowLogsServiceClient client = VpcFlowLogsServiceClient.create()) {
      String parent = String.format("projects/%s/locations/%s", projectId, locationId);

      QueryOrgVpcFlowLogsConfigsRequest request =
          QueryOrgVpcFlowLogsConfigsRequest.newBuilder()
              .setParent(parent)
              .build();

      for (VpcFlowLogsConfig config : client.queryOrgVpcFlowLogsConfigs(request).iterateAll()) {
        System.out.println("VPC Flow Logs config: " + config.getName());
      }
    }
  }
}
// [END networkmanagement_v1beta1_vpcflowlogsservice_query_org_vpc_flow_logs_configs]
