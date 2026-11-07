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

# [START geminidataanalytics_v1alpha_dataagentservice_dataagent_get]
from google.api_core import exceptions
from google.cloud import geminidataanalytics_v1alpha


def get_data_agent(project_id: str, location_id: str, data_agent_id: str) -> None:
    """Retrieves an existing DataAgent resource.

    Args:
        project_id: The Google Cloud project ID.
        location_id: The Google Cloud location/region ID.
        data_agent_id: The identifier of the DataAgent to retrieve.
    """
    client = geminidataanalytics_v1alpha.DataAgentServiceClient()

    name = f"projects/{project_id}/locations/{location_id}/dataAgents/{data_agent_id}"

    request = geminidataanalytics_v1alpha.GetDataAgentRequest(
        name=name,
    )

    try:
        response = client.get_data_agent(request=request)
        print(f"DataAgent name: {response.name}")
    except exceptions.GoogleAPICallError as error:
        print(f"Failed to retrieve DataAgent: {error}")
# [END geminidataanalytics_v1alpha_dataagentservice_dataagent_get]
