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

# [START geminidataanalytics_v1alpha_dataagentservice_dataagents_list]
import google.api_core.exceptions
from google.cloud import geminidataanalytics_v1alpha

client = geminidataanalytics_v1alpha.DataAgentServiceClient()


def list_data_agents(project_id: str, location_id: str) -> None:
    """Lists data agents in a given Google Cloud project and location.

    Args:
        project_id: The Google Cloud project ID to list data agents from.
        location_id: The location ID (for example, 'global').
    """
    parent = f"projects/{project_id}/locations/{location_id}"

    request = geminidataanalytics_v1alpha.ListDataAgentsRequest(
        parent=parent,
    )

    try:
        response = client.list_data_agents(request=request)
        for data_agent in response:
            print(f"Data agent name: {data_agent.name}")
            print(f"Display name: {data_agent.display_name}")
    except google.api_core.exceptions.GoogleAPICallError as error:
        print(f"Request failed: {error}")
# [END geminidataanalytics_v1alpha_dataagentservice_dataagents_list]
