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

# [START dialogflow_v3_experiments_experiment_update]
import google.api_core.exceptions
from google.cloud import dialogflowcx_v3
from google.protobuf import field_mask_pb2


def update_experiment(
    project_id: str,
    location_id: str,
    agent_id: str,
    environment_id: str,
    experiment_id: str,
) -> None:
    """Updates an existing experiment in Dialogflow CX.

    Args:
        project_id: The Google Cloud project ID hosting the Dialogflow CX agent.
        location_id: The region ID where the agent is hosted (for example,
            'global' or 'us-central1').
        agent_id: The server-generated ID of an existing Dialogflow CX agent.
        environment_id: The server-generated ID of an existing environment.
        experiment_id: The server-generated ID of the experiment to update.
    """
    if location_id != "global":
        client_options = {"api_endpoint": f"{location_id}-dialogflow.googleapis.com"}
        client = dialogflowcx_v3.ExperimentsClient(client_options=client_options)
    else:
        client = dialogflowcx_v3.ExperimentsClient()

    update_mask = field_mask_pb2.FieldMask(paths=["description"])
    experiment = dialogflowcx_v3.Experiment(
        name=(
            f"projects/{project_id}/locations/{location_id}/agents/{agent_id}/"
            f"environments/{environment_id}/experiments/{experiment_id}"
        ),
        description="Updated experiment description",
    )

    try:
        response = client.update_experiment(
            experiment=experiment,
            update_mask=update_mask,
        )
        print(f"Updated experiment: {response.name}")
        print(f"Description: {response.description}")
    except google.api_core.exceptions.GoogleAPICallError as e:
        print(f"Update experiment failed: {e}")
# [END dialogflow_v3_experiments_experiment_update]
