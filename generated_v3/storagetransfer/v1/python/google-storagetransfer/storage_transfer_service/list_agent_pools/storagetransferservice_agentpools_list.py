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

# [START storagetransfer_v1_storagetransferservice_agentpools_list]
import google.api_core.exceptions
from google.cloud import storage_transfer_v1


def list_agent_pools(project_id: str) -> None:
    """Lists agent pools in a Google Cloud project.

    Args:
        project_id: The Google Cloud project ID (for example,
            'example-project-id').
    """
    client = storage_transfer_v1.StorageTransferServiceClient()

    request = storage_transfer_v1.ListAgentPoolsRequest(
        project_id=project_id,
    )

    try:
        page_result = client.list_agent_pools(request=request)
        for agent_pool in page_result:
            print(f"Pool Name: {agent_pool.name}")
            print(f"Display Name: {agent_pool.display_name}")
            print(f"State: {agent_pool.state.name}")
    except google.api_core.exceptions.GoogleAPICallError as e:
        print(f"Failed to list agent pools: {e}")
# [END storagetransfer_v1_storagetransferservice_agentpools_list]
