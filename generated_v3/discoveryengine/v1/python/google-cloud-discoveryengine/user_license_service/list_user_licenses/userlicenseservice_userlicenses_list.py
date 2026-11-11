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

# [START discoveryengine_v1_userlicenseservice_userlicenses_list]
import google.api_core.exceptions
from google.cloud import discoveryengine_v1


def list_user_licenses(project_id: str, location_id: str, user_store_id: str) -> None:
    """Lists user licenses associated with a specific UserStore.

    Args:
        project_id: The Google Cloud project ID (for example, 'example-project-id').
        location_id: The Google Cloud region where the service is located (for example, 'global').
        user_store_id: ID of the UserStore (for example, 'default_user_store').
    """
    client = discoveryengine_v1.UserLicenseServiceClient()

    parent = (
        f"projects/{project_id}/locations/{location_id}/userStores/{user_store_id}"
    )

    request = discoveryengine_v1.ListUserLicensesRequest(parent=parent)

    try:
        page_result = client.list_user_licenses(request=request)
        for user_license in page_result:
            print(f"User principal: {user_license.user_principal}")
    except google.api_core.exceptions.GoogleAPICallError as error:
        print(f"Failed to list user licenses: {error}")
# [END discoveryengine_v1_userlicenseservice_userlicenses_list]
