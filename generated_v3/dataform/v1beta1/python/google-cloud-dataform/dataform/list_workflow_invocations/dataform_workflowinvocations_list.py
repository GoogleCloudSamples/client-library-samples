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

# [START dataform_v1beta1_dataform_workflowinvocations_list]
import google.api_core.exceptions
from google.cloud import dataform_v1beta1


def list_workflow_invocations(
    project_id: str, location_id: str, repository_id: str
) -> None:
    """Lists workflow invocations in a Dataform repository.

    Args:
        project_id: The Google Cloud project ID (for example, 'example-project-id').
        location_id: The Google Cloud region where the service is located (for example, 'us-central1').
        repository_id: ID of the repository (for example, 'example-repository-id').
    """
    client = dataform_v1beta1.DataformClient()
    parent = f"projects/{project_id}/locations/{location_id}/repositories/{repository_id}"

    try:
        request = dataform_v1beta1.ListWorkflowInvocationsRequest(parent=parent)
        page_result = client.list_workflow_invocations(request=request)

        has_invocations = False
        for invocation in page_result:
            has_invocations = True
            print(f"Invocation name: {invocation.name}")
            print(f"State: {invocation.state.name}")

        if not has_invocations:
            print(f"No workflow invocations found in {parent}.")
    except google.api_core.exceptions.GoogleAPICallError as error:
        print(f"Failed to list workflow invocations: {error}")
# [END dataform_v1beta1_dataform_workflowinvocations_list]
