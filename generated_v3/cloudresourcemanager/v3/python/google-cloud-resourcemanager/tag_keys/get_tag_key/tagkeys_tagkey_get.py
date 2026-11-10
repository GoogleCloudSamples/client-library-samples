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

# [START cloudresourcemanager_v3_tagkeys_tagkey_get]
import google.api_core.exceptions
from google.cloud import resourcemanager_v3


def get_tag_key(tag_key_id: str) -> None:
    """Retrieves a TagKey resource by its resource name.

    Args:
        tag_key_id: The server-generated numeric ID of the TagKey (for example, '123456789012').
    """
    client = resourcemanager_v3.TagKeysClient()
    name = f"tagKeys/{tag_key_id}"

    request = resourcemanager_v3.GetTagKeyRequest(
        name=name,
    )

    try:
        response = client.get_tag_key(request=request)
        print(f"Retrieved TagKey: {response.name}")
        print(f"Short name: {response.short_name}")
        print(f"Namespaced name: {response.namespaced_name}")
    except google.api_core.exceptions.GoogleAPICallError as error:
        print(f"API request failed: {error}")
# [END cloudresourcemanager_v3_tagkeys_tagkey_get]
