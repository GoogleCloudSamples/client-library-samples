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

# [START geminidataanalytics_v1beta_dataagentservice_dataagentsync_create]
import google.api_core.exceptions
from google.cloud import geminidataanalytics_v1beta


def create_data_agent_sync(
    project_id: str, location_id: str, data_agent_id: str
) -> None:
    """Creates a data agent synchronously.

    Args:
        project_id: The Google Cloud project ID.
        location_id: The Google Cloud location ID (for example, 'global').
        data_agent_id: The caller-chosen identifier for the data agent. Must start
          with a lowercase letter, contain up to 63 characters (lowercase
          letters, digits, and hyphens), and end with a letter or digit (for
          example, 'example-agent'). If omitted, the server auto-generates one.
    """
    client = geminidataanalytics_v1beta.DataAgentServiceClient()

    parent = f"projects/{project_id}/locations/{location_id}"
    data_agent = geminidataanalytics_v1beta.DataAgent(
        display_name="Example Data Agent",
        description="Data agent configured for analytical queries.",
    )

    request = geminidataanalytics_v1beta.CreateDataAgentRequest(
        parent=parent,
        data_agent_id=data_agent_id,
        data_agent=data_agent,
    )

    try:
        response = client.create_data_agent_sync(request=request)
        print(f"Created data agent: {response.name}")
    except google.api_core.exceptions.GoogleAPICallError as exc:
        print(f"Request failed: {exc}")


# [END geminidataanalytics_v1beta_dataagentservice_dataagentsync_create]
