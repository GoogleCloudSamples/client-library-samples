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

# [START geminidataanalytics_v1alpha_dataagentservice_accessibledataagents_list]
import google.api_core.exceptions
from google.cloud import geminidataanalytics_v1alpha

client = geminidataanalytics_v1alpha.DataAgentServiceClient()


def list_accessible_data_agents(project_id: str, location_id: str) -> None:
    """List accessible data agents in a Google Cloud project and location.

    Args:
        project_id: The Google Cloud project ID.
        location_id: The Google Cloud location ID (for example, 'global').
    """
    parent = f"projects/{project_id}/locations/{location_id}"

    request = geminidataanalytics_v1alpha.ListAccessibleDataAgentsRequest(
        parent=parent,
    )

    try:
        response = client.list_accessible_data_agents(request=request)
        for data_agent in response:
            print(f"Data Agent Name: {data_agent.name}")
            print(f"Display Name: {data_agent.display_name}")
            print(f"Description: {data_agent.description}")
    except google.api_core.exceptions.GoogleAPICallError as e:
        print(f"Failed to list accessible data agents: {e.message}")


# [END geminidataanalytics_v1alpha_dataagentservice_accessibledataagents_list]
