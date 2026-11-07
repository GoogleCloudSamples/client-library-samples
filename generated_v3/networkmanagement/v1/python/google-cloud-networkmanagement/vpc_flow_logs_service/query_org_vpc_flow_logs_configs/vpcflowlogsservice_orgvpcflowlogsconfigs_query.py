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

# [START networkmanagement_v1_vpcflowlogsservice_query_org_vpc_flow_logs_configs]
from google.api_core import exceptions
from google.cloud import network_management_v1


def query_org_vpc_flow_logs_configs(project_id: str) -> None:
    """Queries organization-level VPC Flow Logs configurations.

    Args:
        project_id: The Google Cloud project ID (for example, 'example-project-id').
    """
    client = network_management_v1.VpcFlowLogsServiceClient()

    parent = f"projects/{project_id}/locations/global"

    request = network_management_v1.QueryOrgVpcFlowLogsConfigsRequest(
        parent=parent,
    )

    try:
        response = client.query_org_vpc_flow_logs_configs(request=request)
        count = 0
        for config in response:
            print(f"VPC Flow Logs config: {config.name}")
            count += 1
        print(f"Queried {count} organization VPC Flow Logs configurations.")
    except exceptions.GoogleAPIError as exception:
        print(f"Failed to query VPC Flow Logs configs: {exception}")


# [END networkmanagement_v1_vpcflowlogsservice_query_org_vpc_flow_logs_configs]
