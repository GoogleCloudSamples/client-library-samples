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

# [START networkmanagement_v1_vpcflowlogsservice_vpcflowlogsconfigs_list]
from google.api_core import exceptions
from google.cloud import network_management_v1


def list_vpc_flow_logs_configs(project_id: str) -> None:
    """List VPC flow logs configurations in a Google Cloud project.

    Args:
        project_id: The Google Cloud project ID (for example, 'example-project-id').
    """
    client = network_management_v1.VpcFlowLogsServiceClient()
    parent = f"projects/{project_id}/locations/global"

    try:
        response = client.list_vpc_flow_logs_configs(parent=parent)
        for config in response:
            print(f"VPC Flow Logs Config: {config.name}")
    except exceptions.GoogleAPICallError as error:
        print(f"API call failed: {error}")


# [END networkmanagement_v1_vpcflowlogsservice_vpcflowlogsconfigs_list]
