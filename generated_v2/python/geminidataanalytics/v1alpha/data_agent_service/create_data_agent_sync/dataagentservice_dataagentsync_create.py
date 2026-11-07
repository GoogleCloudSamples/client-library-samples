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

# [START geminidataanalytics_v1alpha_dataagentservice_dataagentsync_create]
import google.api_core.exceptions
from google.cloud import geminidataanalytics_v1alpha

client = geminidataanalytics_v1alpha.DataAgentServiceClient()


def create_data_agent_sync(
    project_id: str, location_id: str, data_agent_id: str
) -> None:
    """Creates a DataAgent synchronously in Google Cloud Gemini Data Analytics.

    Args:
        project_id: The Google Cloud project ID.
        location_id: The Google Cloud location ID (for example, 'global').
        data_agent_id: The caller-specified ID for the DataAgent. Must match
            '^[a-z]([a-z0-9-]{0,61}[a-z0-9])?$'.
    """
    parent = f"projects/{project_id}/locations/{location_id}"
    data_agent = geminidataanalytics_v1alpha.DataAgent(
        display_name="Example Data Agent"
    )

    try:
        response = client.create_data_agent_sync(
            parent=parent,
            data_agent_id=data_agent_id,
            data_agent=data_agent,
        )
        print(f"Created DataAgent: {response.name}")
    except google.api_core.exceptions.GoogleAPICallError as e:
        print(f"API call failed: {e}")
# [END geminidataanalytics_v1alpha_dataagentservice_dataagentsync_create]
