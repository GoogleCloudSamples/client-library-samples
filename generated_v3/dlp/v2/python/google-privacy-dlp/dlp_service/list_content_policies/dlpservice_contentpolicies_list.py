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

# [START dlp_v2_dlpservice_contentpolicies_list]
import google.api_core.exceptions
from google.cloud import dlp_v2


def list_content_policies(project_id: str, location_id: str) -> None:
    """Lists content policies defined in a Google Cloud project and location.

    Args:
        project_id: The Google Cloud project ID hosting the content policies.
        location_id: The Google Cloud location where the content policies are defined (for example, 'global' or 'us-central1').
    """
    client = dlp_v2.DlpServiceClient()
    parent = f"projects/{project_id}/locations/{location_id}"

    request = dlp_v2.ListContentPoliciesRequest(
        parent=parent,
    )

    try:
        response = client.list_content_policies(request=request)
        found_policy = False
        for policy in response:
            print(f"Policy: {policy.name}")
            found_policy = True

        if not found_policy:
            print(f"No content policies found in {parent}.")
    except google.api_core.exceptions.GoogleAPIError as err:
        print(f"API error encountered: {err}")
# [END dlp_v2_dlpservice_contentpolicies_list]
