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

# [START geminidataanalytics_v1beta_dataagentservice_dataagentsync_update]
import google.api_core.exceptions
from google.cloud import geminidataanalytics_v1beta
from google.protobuf import field_mask_pb2

client = geminidataanalytics_v1beta.DataAgentServiceClient()


def update_data_agent_sync(
    project_id: str, location_id: str, data_agent_id: str
) -> None:
    """Updates an existing DataAgent synchronously.

    Args:
        project_id: The Google Cloud project ID.
        location_id: The Google Cloud region or location for the DataAgent.
        data_agent_id: The resource ID of the DataAgent.
    """
    agent_name = (
        f"projects/{project_id}/locations/{location_id}/dataAgents/{data_agent_id}"
    )

    data_agent = geminidataanalytics_v1beta.DataAgent(
        name=agent_name,
        description="Updated Data Agent description",
    )
    update_mask = field_mask_pb2.FieldMask(paths=["description"])

    try:
        response = client.update_data_agent_sync(
            data_agent=data_agent,
            update_mask=update_mask,
        )
        print(f"Data agent updated successfully: {response.name}")
        print(f"Description: {response.description}")
    except google.api_core.exceptions.GoogleAPICallError as error:
        print(f"Failed to update data agent: {error}")
# [END geminidataanalytics_v1beta_dataagentservice_dataagentsync_update]
