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

# [START apikeys_v2_apikeys_keys_list]
import google.api_core.exceptions
from google.cloud import api_keys_v2


def list_keys(project_id: str, location_id: str) -> None:
    """Lists API keys in a Google Cloud project.

    Args:
        project_id: The Google Cloud project ID.
        location_id: The geographic location for API keys.
    """
    client = api_keys_v2.ApiKeysClient()
    parent = f"projects/{project_id}/locations/{location_id}"

    try:
        request = api_keys_v2.ListKeysRequest(parent=parent)
        response = client.list_keys(request=request)

        for key in response:
            print(f"Key name: {key.name}")
            print(f"Display name: {key.display_name}")
    except google.api_core.exceptions.GoogleAPICallError as error:
        print(f"Failed to list API keys: {error}")
# [END apikeys_v2_apikeys_keys_list]
