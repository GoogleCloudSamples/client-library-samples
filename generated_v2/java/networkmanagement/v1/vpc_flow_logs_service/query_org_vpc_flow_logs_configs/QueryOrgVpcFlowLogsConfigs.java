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

// [START networkmanagement_v1_vpcflowlogsservice_query_org_vpc_flow_logs_configs]
import com.google.cloud.networkmanagement.v1.QueryOrgVpcFlowLogsConfigsRequest;
import com.google.cloud.networkmanagement.v1.VpcFlowLogsConfig;
import com.google.cloud.networkmanagement.v1.VpcFlowLogsServiceClient;

public class QueryOrgVpcFlowLogsConfigs {

  public static void main(String[] args) throws Exception {
    String projectId = args.length > 0 ? args[0] : System.getenv("GOOGLE_CLOUD_PROJECT");
    queryOrgVpcFlowLogsConfigs(projectId);
  }

  public static void queryOrgVpcFlowLogsConfigs(String projectId) throws Exception {
    // Initialize client inside try-with-resources for automatic cleanup.
    try (VpcFlowLogsServiceClient client = VpcFlowLogsServiceClient.create()) {
      String parent = String.format("projects/%s/locations/global", projectId);

      QueryOrgVpcFlowLogsConfigsRequest request =
          QueryOrgVpcFlowLogsConfigsRequest.newBuilder()
              .setParent(parent)
              .build();

      // Retrieve organization VPC Flow Logs configurations for the parent resource.
      for (VpcFlowLogsConfig config : client.queryOrgVpcFlowLogsConfigs(request).iterateAll()) {
        System.out.println("VPC Flow Logs config: " + config.getName());
      }
    }
  }
}
// [END networkmanagement_v1_vpcflowlogsservice_query_org_vpc_flow_logs_configs]
