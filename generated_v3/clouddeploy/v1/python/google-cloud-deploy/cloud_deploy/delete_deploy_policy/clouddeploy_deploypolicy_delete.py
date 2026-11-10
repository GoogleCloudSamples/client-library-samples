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

# [START clouddeploy_v1_clouddeploy_deploypolicy_delete]
from google.api_core import exceptions
from google.cloud import deploy_v1


def delete_deploy_policy(
    project_id: str, deploy_policy_id: str, location_id: str
) -> None:
    """Deletes an existing deploy policy resource.

    Args:
        project_id: The Google Cloud project ID (for example, 'example-project-id').
        deploy_policy_id: The ID of the deploy policy to delete.
        location_id: The Google Cloud region or location ID (for example, 'us-central1').
    """
    client = deploy_v1.CloudDeployClient()

    name = (
        f"projects/{project_id}/locations/{location_id}/"
        f"deployPolicies/{deploy_policy_id}"
    )

    try:
        # DeleteDeployPolicy is a long-running operation; wait for completion.
        operation = client.delete_deploy_policy(name=name)
        operation.result()
        print(f"Deleted deploy policy: {name}")
    except exceptions.GoogleAPICallError as error:
        print(f"Failed to delete deploy policy: {error}")


# [END clouddeploy_v1_clouddeploy_deploypolicy_delete]
