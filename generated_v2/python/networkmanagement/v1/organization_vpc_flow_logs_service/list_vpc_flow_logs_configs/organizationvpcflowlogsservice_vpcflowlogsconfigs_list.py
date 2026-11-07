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

# [START networkmanagement_v1_organizationvpcflowlogsservice_vpcflowlogsconfigs_list]
from google.api_core.client_options import ClientOptions
import google.api_core.exceptions
from google.cloud import network_management_v1


def list_vpc_flow_logs_configs(project_id: str) -> None:
    """Lists VPC Flow Logs configurations for a project.

    Args:
        project_id: The Google Cloud project ID (for example,
          'example-project-id').
    """
    client_options = ClientOptions(quota_project_id=project_id)
    client = network_management_v1.OrganizationVpcFlowLogsServiceClient(
        client_options=client_options
    )

    parent = f"projects/{project_id}/locations/global"

    request = network_management_v1.ListVpcFlowLogsConfigsRequest(
        parent=parent,
    )

    try:
        response = client.list_vpc_flow_logs_configs(request=request)
        count = 0
        for config in response:
            print(f"Configuration name: {config.name}")
            print(f"State: {config.state}")
            count += 1
        print(f"Total configurations listed: {count}")
    except google.api_core.exceptions.GoogleAPICallError as e:
        print(f"Failed to list VPC Flow Logs configurations: {e}")
# [END networkmanagement_v1_organizationvpcflowlogsservice_vpcflowlogsconfigs_list]
