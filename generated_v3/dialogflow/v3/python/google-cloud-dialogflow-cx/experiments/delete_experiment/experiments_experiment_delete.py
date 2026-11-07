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

# [START dialogflow_v3_experiments_experiment_delete]
from google.api_core import exceptions
from google.cloud import dialogflowcx_v3


def delete_experiment(
    project_id: str,
    location_id: str,
    agent_id: str,
    environment_id: str,
    experiment_id: str,
) -> None:
    """Deletes a Dialogflow CX experiment.

    Args:
        project_id: The Google Cloud project ID (for example, 'example-project-id')
        location_id: The Google Cloud region where the service is located (for example, 'us-central1')
        agent_id: ID of the Agent (for example, 'example-agent-id')
        environment_id: ID of the Environment (for example, 'example-environment-id')
        experiment_id: ID of the Experiment (for example, 'example-experiment-id')
    """
    client_options = {"quota_project_id": project_id}
    if location_id and location_id != "global":
        api_endpoint = f"{location_id}-dialogflow.googleapis.com"
        client_options["api_endpoint"] = api_endpoint

    client = dialogflowcx_v3.ExperimentsClient(client_options=client_options)

    name = client.experiment_path(
        project_id, location_id, agent_id, environment_id, experiment_id
    )

    request = dialogflowcx_v3.DeleteExperimentRequest(name=name)

    try:
        client.delete_experiment(request=request)
        print(f"Deleted experiment: {name}")
    except exceptions.GoogleAPICallError as error:
        print(f"Failed to delete experiment: {error}")
# [END dialogflow_v3_experiments_experiment_delete]
