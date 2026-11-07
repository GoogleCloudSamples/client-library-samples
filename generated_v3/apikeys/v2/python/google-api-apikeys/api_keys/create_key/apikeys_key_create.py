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

# [START apikeys_v2_apikeys_key_create]
from google.api_core import exceptions
from google.cloud import api_keys_v2


def create_key(project_id: str, location_id: str, key_id: str) -> None:
    """Creates an API key.

    Args:
        project_id: Google Cloud project ID.
        location_id: The location for the key resource ('global').
        key_id: Identifier for the key.
    """
    client = api_keys_v2.ApiKeysClient()

    parent = f"projects/{project_id}/locations/{location_id}"
    key = api_keys_v2.Key(display_name="Sample API Key")

    try:
        operation = client.create_key(
            parent=parent,
            key=key,
            key_id=key_id,
        )
        response = operation.result()

        print(f"Created key: {response.name}")
        print(f"Key string: {response.key_string}")
    except exceptions.GoogleAPICallError as error:
        print(f"Error creating API key: {error}")
# [END apikeys_v2_apikeys_key_create]
