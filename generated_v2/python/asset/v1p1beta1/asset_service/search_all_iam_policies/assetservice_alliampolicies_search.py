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

# [START cloudasset_v1p1beta1_assetservice_alliampolicies_search]
import google.api_core.exceptions
from google.cloud import asset_v1


def search_all_iam_policies(project_id: str) -> None:
    """Searches IAM policies within a Google Cloud project.

    Args:
        project_id: The Google Cloud project ID to search IAM policies within.
    """
    scope = f"projects/{project_id}"

    client = asset_v1.AssetServiceClient()

    try:
        response = client.search_all_iam_policies(scope=scope)
        for policy_result in response:
            print(f"Resource: {policy_result.resource}")
            print(f"Policy: {policy_result.policy}")
    except google.api_core.exceptions.GoogleAPICallError as error:
        print(f"Request failed: {error}")
# [END cloudasset_v1p1beta1_assetservice_alliampolicies_search]
