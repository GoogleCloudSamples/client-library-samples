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

# [START apikeys_v2_apikeys_keystring_get]
import os

from google.api_core import exceptions
from google.cloud import api_keys_v2


def get_key_string() -> None:
    """Get the key string value for an API key."""
    client = api_keys_v2.ApiKeysClient()

    project_id = os.environ.get("GOOGLE_CLOUD_PROJECT", "example-project-id")
    key_id = os.environ.get("API_KEY_ID") or os.environ.get("KEY_ID", "example-key-id")
    name = (
        os.environ.get("API_KEY_NAME")
        or os.environ.get("KEY_NAME")
        or f"projects/{project_id}/locations/global/keys/{key_id}"
    )

    # When running in a configured project, resolve an existing key if the ID is unset.
    if key_id == "example-key-id" and project_id != "example-project-id":
        try:
            for key in client.list_keys(
                parent=f"projects/{project_id}/locations/global"
            ):
                name = key.name
                break
        except exceptions.GoogleAPICallError:
            pass

    request = api_keys_v2.GetKeyStringRequest(
        name=name,
    )

    try:
        response = client.get_key_string(request=request)
        print(f"Retrieved key string: {response.key_string}")
    except exceptions.GoogleAPICallError as error:
        print(f"Request failed: {error}")
# [END apikeys_v2_apikeys_keystring_get]
