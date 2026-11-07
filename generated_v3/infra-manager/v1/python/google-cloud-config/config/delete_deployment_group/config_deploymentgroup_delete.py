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

# [START config_delete_deployment_group]
from google.api_core import exceptions
from google.cloud import config_v1


def delete_deployment_group(
    project_id: str, location_id: str, deployment_group_id: str
) -> None:
    """Deletes a deployment group.

    Args:
        project_id: The Google Cloud project ID (for example, 'example-project-id').
        location_id: The Google Cloud region where the service is located (for example, 'us-central1').
        deployment_group_id: The deployment group ID (for example, 'example-deployment-group-id').
    """
    client = config_v1.ConfigClient()
    name = f"projects/{project_id}/locations/{location_id}/deploymentGroups/{deployment_group_id}"

    try:
        operation = client.delete_deployment_group(name=name)
        operation.result()
        print(f"Deleted deployment group: {name}")
    except exceptions.GoogleAPICallError as e:
        print(f"API error occurred: {e}")


# [END config_delete_deployment_group]
