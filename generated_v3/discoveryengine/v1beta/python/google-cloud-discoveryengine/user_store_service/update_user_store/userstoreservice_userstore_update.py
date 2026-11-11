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

# [START discoveryengine_update_user_store]
from google.api_core import exceptions
from google.api_core.client_options import ClientOptions
from google.cloud import discoveryengine_v1beta


def update_user_store(
    project_id: str,
    location_id: str,
    user_store_id: str,
) -> None:
    """Updates a user store in Google Cloud Discovery Engine.

    Args:
        project_id: The Google Cloud project ID (for example, 'example-project-id').
        location_id: The Google Cloud location (for example, 'global').
        user_store_id: The identifier of the user store (for example, 'default_user_store').
    """
    if location_id != "global":
        client_options = ClientOptions(
            api_endpoint=f"{location_id}-discoveryengine.googleapis.com",
            quota_project_id=project_id,
        )
    else:
        client_options = ClientOptions(quota_project_id=project_id)

    client = discoveryengine_v1beta.UserStoreServiceClient(
        client_options=client_options
    )

    user_store_name = (
        f"projects/{project_id}/locations/{location_id}/userStores/{user_store_id}"
    )

    user_store = discoveryengine_v1beta.UserStore(
        name=user_store_name,
    )

    request = discoveryengine_v1beta.UpdateUserStoreRequest(
        user_store=user_store,
    )

    try:
        response = client.update_user_store(request=request)
        print(f"Updated user store: {response.name}")
    except exceptions.GoogleAPICallError as exc:
        print(f"Failed to update user store: {exc}")


# [END discoveryengine_update_user_store]
