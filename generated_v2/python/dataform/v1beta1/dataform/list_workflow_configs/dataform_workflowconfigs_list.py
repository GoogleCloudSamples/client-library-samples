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

# [START dataform_v1beta1_dataform_workflowconfigs_list]
from google.api_core import exceptions
from google.cloud import dataform_v1beta1


def list_workflow_configs(
    project_id: str, location_id: str, repository_id: str
) -> None:
    """Lists workflow configurations in a Dataform repository.

    Args:
        project_id: The Google Cloud project ID (for example, 'example-project-id').
        location_id: The Google Cloud region where the service is located (for example, 'us-central1').
        repository_id: The ID of the Dataform repository (for example, 'example-repository-id').
    """
    client = dataform_v1beta1.DataformClient()

    parent = (
        f"projects/{project_id}/locations/{location_id}/repositories/{repository_id}"
    )

    request = dataform_v1beta1.ListWorkflowConfigsRequest(parent=parent)

    try:
        response = client.list_workflow_configs(request=request)
        count = 0
        for workflow_config in response:
            print(f"Workflow config: {workflow_config.name}")
            count += 1

        if count == 0:
            print(f"No workflow configurations found in repository: {repository_id}")
    except exceptions.GoogleAPICallError as error:
        print(f"Error listing workflow configs: {error}")
# [END dataform_v1beta1_dataform_workflowconfigs_list]
