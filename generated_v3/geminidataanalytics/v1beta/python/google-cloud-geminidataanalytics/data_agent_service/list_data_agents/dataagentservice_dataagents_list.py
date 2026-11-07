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

# [START geminidataanalytics_v1beta_dataagentservice_dataagents_list]
import google.api_core.exceptions
from google.cloud import geminidataanalytics_v1beta

client = geminidataanalytics_v1beta.DataAgentServiceClient()


def list_data_agents(project_id: str, location_id: str) -> None:
    """List data agents in a specified project and location.

    Args:
        project_id: The Google Cloud project ID containing the data agents.
        location_id: The Google Cloud location ID (for example, 'global') where the data agents reside.
    """
    parent = f"projects/{project_id}/locations/{location_id}"

    request = geminidataanalytics_v1beta.ListDataAgentsRequest(
        parent=parent,
    )

    try:
        response = client.list_data_agents(request=request)
        for data_agent in response:
            print(f"Data agent name: {data_agent.name}")
    except google.api_core.exceptions.GoogleAPICallError as error:
        print(f"Request failed: {error.message}")
# [END geminidataanalytics_v1beta_dataagentservice_dataagents_list]
