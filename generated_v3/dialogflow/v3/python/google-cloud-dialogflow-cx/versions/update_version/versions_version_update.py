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

# [START dialogflow_v3_versions_version_update]
import google.api_core.exceptions
from google.cloud import dialogflowcx_v3
from google.protobuf import field_mask_pb2


def update_version(
    project_id: str,
    location_id: str,
    agent_id: str,
    flow_id: str,
    version_id: str,
) -> None:
    """Updates the description of an existing Dialogflow CX version.

    Args:
        project_id: The Google Cloud project ID.
        location_id: The region ID where the Dialogflow CX agent is located
          (for example, 'global' or 'us-central1').
        agent_id: The unique identifier of the Dialogflow CX agent.
        flow_id: The unique identifier of the flow.
        version_id: The unique identifier of the version.
    """
    if location_id != "global":
        api_endpoint = f"{location_id}-dialogflow.googleapis.com"
        client = dialogflowcx_v3.VersionsClient(
            client_options={"api_endpoint": api_endpoint}
        )
    else:
        client = dialogflowcx_v3.VersionsClient()

    version = dialogflowcx_v3.Version(
        name=(
            f"projects/{project_id}/locations/{location_id}/agents/{agent_id}/"
            f"flows/{flow_id}/versions/{version_id}"
        ),
        description="Updated version description",
    )
    update_mask = field_mask_pb2.FieldMask(paths=["description"])

    request = dialogflowcx_v3.UpdateVersionRequest(
        version=version,
        update_mask=update_mask,
    )

    try:
        response = client.update_version(request=request)
        print(f"Updated version name: {response.name}")
        print(f"Updated description: {response.description}")
    except google.api_core.exceptions.GoogleAPICallError as e:
        print(f"Failed to update version: {e}")
# [END dialogflow_v3_versions_version_update]
