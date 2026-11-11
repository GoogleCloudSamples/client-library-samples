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

# [START discoveryengine_v1beta_userstoreservice_userstore_get]
import google.api_core.exceptions
from google.cloud import discoveryengine_v1beta

client = discoveryengine_v1beta.UserStoreServiceClient()


def get_user_store(project_id: str, location_id: str, user_store_id: str) -> None:
    """Retrieves a UserStore resource.

    Args:
        project_id: The Google Cloud project ID (for example, 'example-project-id').
        location_id: The Google Cloud region or multi-region location (for example, 'global').
        user_store_id: The ID of the user store (for example, 'default_user_store').
    """
    name = f"projects/{project_id}/locations/{location_id}/userStores/{user_store_id}"

    request = discoveryengine_v1beta.GetUserStoreRequest(name=name)

    try:
        response = client.get_user_store(request=request)
        print(f"Retrieved user store: {response.name}")
    except google.api_core.exceptions.GoogleAPICallError as error:
        print(f"Failed to retrieve user store: {error}")
# [END discoveryengine_v1beta_userstoreservice_userstore_get]
