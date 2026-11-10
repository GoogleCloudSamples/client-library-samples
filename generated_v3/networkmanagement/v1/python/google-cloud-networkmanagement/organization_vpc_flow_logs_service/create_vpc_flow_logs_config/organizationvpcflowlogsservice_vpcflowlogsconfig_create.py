# Copyright 2026 Google LLC
#
# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at
#
#     http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.

# [START networkmanagement_v1_organizationvpcflowlogsservice_vpcflowlogsconfig_create]
import google.api_core.exceptions
from google.cloud import network_management_v1


def create_vpc_flow_logs_config(
    project_id: str, vpc_flow_logs_config_id: str
) -> None:
    """Creates a VPC Flow Logs configuration.

    Args:
        project_id: The Google Cloud project ID (for example,
          'example-project-id').
        vpc_flow_logs_config_id: The identifier for the VPC Flow Logs
          configuration (for example, 'example-vpc-flow-logs-config-id').
    """
    client = network_management_v1.OrganizationVpcFlowLogsServiceClient()

    parent = f"projects/{project_id}/locations/global"
    vpc_flow_logs_config = network_management_v1.VpcFlowLogsConfig(
        description="Sample VPC Flow Logs configuration",
        state=network_management_v1.VpcFlowLogsConfig.State.ENABLED,
        aggregation_interval=network_management_v1.VpcFlowLogsConfig.AggregationInterval.INTERVAL_5_SEC,
        flow_sampling=0.5,
        metadata=network_management_v1.VpcFlowLogsConfig.Metadata.INCLUDE_ALL_METADATA,
        vpn_tunnel=f"projects/{project_id}/regions/us-central1/vpnTunnels/example-vpn-tunnel",
    )

    try:
        operation = client.create_vpc_flow_logs_config(
            parent=parent,
            vpc_flow_logs_config_id=vpc_flow_logs_config_id,
            vpc_flow_logs_config=vpc_flow_logs_config,
        )
        response = operation.result()
        print(f"Created VPC Flow Logs configuration: {response.name}")
    except google.api_core.exceptions.GoogleAPICallError as e:
        print(f"API call failed: {e}")
# [END networkmanagement_v1_organizationvpcflowlogsservice_vpcflowlogsconfig_create]
