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

# [START dialogflow_v3_environments_environment_update]
from google.api_core import exceptions
from google.cloud import dialogflowcx_v3
from google.protobuf import field_mask_pb2


def update_environment(
    project_id: str, location_id: str, agent_id: str, environment_id: str
) -> None:
    """Updates a Dialogflow CX environment.

    Args:
        project_id: The Google Cloud project ID.
        location_id: The region or location of the Dialogflow CX agent (for
          example, 'global' or 'us-central1').
        agent_id: The ID of the Dialogflow CX agent.
        environment_id: The ID of the Dialogflow CX environment to update.
    """
    if location_id != "global":
        client_options = {"api_endpoint": f"{location_id}-dialogflow.googleapis.com"}
        client = dialogflowcx_v3.EnvironmentsClient(client_options=client_options)
    else:
        client = dialogflowcx_v3.EnvironmentsClient()

    environment = dialogflowcx_v3.Environment(
        name=f"projects/{project_id}/locations/{location_id}/agents/{agent_id}/environments/{environment_id}",
        description="Updated environment description.",
    )
    update_mask = field_mask_pb2.FieldMask(paths=["description"])

    try:
        operation = client.update_environment(
            environment=environment,
            update_mask=update_mask,
        )
        response = operation.result()
        print(f"Updated environment: {response.name}")
        print(f"Description: {response.description}")
    except exceptions.GoogleAPICallError as error:
        print(f"API call failed: {error}")


# [END dialogflow_v3_environments_environment_update]
