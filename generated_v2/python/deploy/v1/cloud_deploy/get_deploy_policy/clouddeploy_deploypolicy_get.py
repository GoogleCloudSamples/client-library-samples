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

# [START clouddeploy_v1_clouddeploy_deploypolicy_get]
import google.api_core.exceptions
from google.cloud import deploy_v1


def get_deploy_policy(project_id: str) -> None:
    """Retrieves a deploy policy from Google Cloud Deploy.

    Args:
        project_id: The Google Cloud project ID (for example,
            'example-project-id').
    """
    client = deploy_v1.CloudDeployClient()

    deploy_policy_name = "example-deploy-policy"
    location_name = "us-central1"

    # Locate an existing deploy policy in the project if available.
    parent = f"projects/{project_id}/locations/{location_name}"
    try:
        for policy in client.list_deploy_policies(parent=parent):
            deploy_policy_name = policy.name.split("/")[-1]
            break
    except google.api_core.exceptions.GoogleAPICallError:
        pass

    name = f"projects/{project_id}/locations/{location_name}/deployPolicies/{deploy_policy_name}"

    request = deploy_v1.GetDeployPolicyRequest(name=name)

    try:
        response = client.get_deploy_policy(request=request)
        print(f"Retrieved deploy policy: {response.name}")
    except google.api_core.exceptions.NotFound:
        print(f"Deploy policy not found: {name}")
    except google.api_core.exceptions.GoogleAPICallError as err:
        print(f"Deploy policy retrieval failed: {err}")
# [END clouddeploy_v1_clouddeploy_deploypolicy_get]
