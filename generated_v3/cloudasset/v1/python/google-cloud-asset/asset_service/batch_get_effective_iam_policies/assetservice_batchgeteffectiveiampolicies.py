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

# [START cloudasset_v1_assetservice_batch_get_effective_iam_policies]
import google.api_core.exceptions
from google.cloud import asset_v1


def batch_get_effective_iam_policies(project_id: str) -> None:
    """Retrieves effective IAM policies for specified resources within a scope.

    Args:
        project_id: The Google Cloud project ID used to form the query scope and
          identify the target resource.
    """
    client = asset_v1.AssetServiceClient()

    scope = f"projects/{project_id}"
    names = [f"//cloudresourcemanager.googleapis.com/projects/{project_id}"]

    request = asset_v1.BatchGetEffectiveIamPoliciesRequest(
        scope=scope,
        names=names,
    )

    try:
        response = client.batch_get_effective_iam_policies(request=request)
        for policy_result in response.policy_results:
            print(f"Asset: {policy_result.full_resource_name}")
            for policy_info in policy_result.policies:
                print(f"Attached to: {policy_info.attached_resource}")
                print(f"Policy: {policy_info.policy}")
    except google.api_core.exceptions.GoogleAPICallError as error:
        print(f"Failed to get effective IAM policies: {error}")
# [END cloudasset_v1_assetservice_batch_get_effective_iam_policies]
