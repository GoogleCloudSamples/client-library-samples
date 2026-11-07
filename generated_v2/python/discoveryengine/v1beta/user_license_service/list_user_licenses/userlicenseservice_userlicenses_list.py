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

# [START discoveryengine_v1beta_userlicenseservice_userlicenses_list]
import google.api_core.exceptions
from google.cloud import discoveryengine_v1beta


def list_user_licenses(project_id: str, location_id: str, user_store_id: str) -> None:
    """Lists user licenses in a user store.

    Args:
        project_id: The Google Cloud project ID (for example, 'example-project-id').
        location_id: The Google Cloud region where the service is located (for example, 'global').
        user_store_id: ID of the UserStore (for example, 'example-userstore-id').
    """
    client = discoveryengine_v1beta.UserLicenseServiceClient()

    parent = f"projects/{project_id}/locations/{location_id}/userStores/{user_store_id}"

    request = discoveryengine_v1beta.ListUserLicensesRequest(
        parent=parent,
    )

    try:
        page_result = client.list_user_licenses(request=request)
        count = 0
        for user_license in page_result:
            print(f"User license: {user_license.name}")
            count += 1

        if count == 0:
            print("No user licenses found.")
    except google.api_core.exceptions.GoogleAPICallError as e:
        print(f"Request failed: {e}")
# [END discoveryengine_v1beta_userlicenseservice_userlicenses_list]
