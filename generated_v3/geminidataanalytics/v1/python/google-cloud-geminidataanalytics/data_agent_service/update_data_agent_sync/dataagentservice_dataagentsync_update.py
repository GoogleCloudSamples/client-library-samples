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

# [START geminidataanalytics_v1_dataagentservice_dataagentsync_update]
import google.api_core.exceptions
from google.cloud import geminidataanalytics_v1
from google.protobuf import field_mask_pb2

client = geminidataanalytics_v1.DataAgentServiceClient()


def update_data_agent_sync(
    project_id: str, location_id: str, data_agent_id: str
) -> None:
    """Updates a DataAgent resource synchronously.

    Args:
        project_id: The Google Cloud project ID.
        location_id: The Google Cloud region or location (for example, 'global').
        data_agent_id: The ID of the existing DataAgent to update.
    """
    data_agent = geminidataanalytics_v1.DataAgent(
        name=f"projects/{project_id}/locations/{location_id}/dataAgents/{data_agent_id}",
        description="Updated Data Agent description",
    )
    update_mask = field_mask_pb2.FieldMask(paths=["description"])

    try:
        response = client.update_data_agent_sync(
            data_agent=data_agent,
            update_mask=update_mask,
        )
        print(f"Updated DataAgent: {response.name}")
    except google.api_core.exceptions.GoogleAPICallError as e:
        print(f"API call failed: {e}")
# [END geminidataanalytics_v1_dataagentservice_dataagentsync_update]
