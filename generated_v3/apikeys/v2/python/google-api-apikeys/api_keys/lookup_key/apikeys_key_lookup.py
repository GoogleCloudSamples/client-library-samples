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

# [START apikeys_v2_apikeys_lookup_key]
import google.api_core.exceptions
from google.cloud import api_keys_v2


def lookup_key(key_string: str) -> None:
    """Finds the resource name and parent of an API key using its key string.

    Args:
        key_string: The key string value of the API key to look up.
    """
    client = api_keys_v2.ApiKeysClient()

    try:
        request = api_keys_v2.LookupKeyRequest(key_string=key_string)
        response = client.lookup_key(request=request)
        print(f"Key name: {response.name}")
        print(f"Parent: {response.parent}")
    except google.api_core.exceptions.GoogleAPICallError as error:
        print(f"Failed to look up API key: {error}")
# [END apikeys_v2_apikeys_lookup_key]
