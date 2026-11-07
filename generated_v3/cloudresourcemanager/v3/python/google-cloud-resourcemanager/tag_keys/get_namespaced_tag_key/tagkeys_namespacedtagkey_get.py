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

# [START cloudresourcemanager_v3_tagkeys_namespacedtagkey_get]
from google.api_core import exceptions
from google.cloud import resourcemanager_v3


def get_namespaced_tag_key(parent_id: str, tag_key_short_id: str) -> None:
    """Retrieves a TagKey resource by its namespaced name.

    Args:
        parent_id: The ID of the parent resource, which can be an organization ID
          (for example, '123456789012') or a project ID (for example,
          'example-project').
        tag_key_short_id: The user-friendly short name of the TagKey (for
          example, 'environment').
    """
    client = resourcemanager_v3.TagKeysClient()

    name = f"{parent_id}/{tag_key_short_id}"

    request = resourcemanager_v3.GetNamespacedTagKeyRequest(
        name=name,
    )

    try:
        response = client.get_namespaced_tag_key(request=request)
        print(f"Retrieved TagKey: {response.name}")
        print(f"Namespaced name: {response.namespaced_name}")
    except exceptions.GoogleAPICallError as error:
        print(f"Failed to retrieve TagKey: {error}")


# [END cloudresourcemanager_v3_tagkeys_namespacedtagkey_get]
