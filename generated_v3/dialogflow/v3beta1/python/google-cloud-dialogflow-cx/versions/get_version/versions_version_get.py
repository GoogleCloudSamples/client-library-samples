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

# [START dialogflow_v3beta1_versions_version_get]
import google.api_core.exceptions
from google.cloud import dialogflowcx_v3beta1


def get_version(
    project_id: str,
    location_id: str,
    agent_id: str,
    flow_id: str,
    version_id: str,
) -> None:
    """Retrieves the specified version of a Dialogflow CX flow.

    Args:
        project_id: The Google Cloud project ID (for example, 'example-project-id').
        location_id: The Google Cloud region where the Dialogflow CX agent is located (for example, 'us-central1').
        agent_id: The server-generated ID of the Dialogflow CX agent.
        flow_id: The server-generated ID of the flow (or '00000000-0000-0000-0000-000000000000' for the default start flow).
        version_id: The server-generated ID of the version (for example, '1').
    """
    client_options = None
    if location_id != "global":
        client_options = {"api_endpoint": f"{location_id}-dialogflow.googleapis.com"}

    client = dialogflowcx_v3beta1.VersionsClient(client_options=client_options)

    name = (
        f"projects/{project_id}/locations/{location_id}/agents/{agent_id}/"
        f"flows/{flow_id}/versions/{version_id}"
    )

    request = dialogflowcx_v3beta1.GetVersionRequest(
        name=name,
    )

    try:
        response = client.get_version(request=request)
        print(f"Version name: {response.name}")
        print(f"Display name: {response.display_name}")
    except google.api_core.exceptions.GoogleAPICallError as error:
        print(f"Failed to retrieve version: {error}")
# [END dialogflow_v3beta1_versions_version_get]
