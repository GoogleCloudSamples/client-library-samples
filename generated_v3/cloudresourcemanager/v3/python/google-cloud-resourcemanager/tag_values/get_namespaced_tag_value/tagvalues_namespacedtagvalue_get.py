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

# [START cloudresourcemanager_v3_tagvalues_namespacedtagvalue_get]
import google.api_core.exceptions
from google.cloud import resourcemanager_v3


def get_namespaced_tag_value(
    parent_id: str, tag_key_short_id: str, tag_value_short_id: str
) -> None:
    """Retrieves a TagValue by its namespaced name.

    Args:
        parent_id: The parent organization ID (for example, '123456789012') or
          project ID (for example, 'example-project-id') owning the TagKey.
        tag_key_short_id: The user-assigned short name of the parent TagKey (for
          example, 'env').
        tag_value_short_id: The user-assigned short name of the TagValue (for
          example, 'prod').
    """
    client = resourcemanager_v3.TagValuesClient()

    name = f"{parent_id}/{tag_key_short_id}/{tag_value_short_id}"

    request = resourcemanager_v3.GetNamespacedTagValueRequest(
        name=name,
    )

    try:
        response = client.get_namespaced_tag_value(request=request)
        print(f"Resource name: {response.name}")
        print(f"Namespaced name: {response.namespaced_name}")
        print(f"Description: {response.description}")
    except google.api_core.exceptions.GoogleAPICallError as error:
        print(f"Failed to retrieve TagValue: {error}")


# [END cloudresourcemanager_v3_tagvalues_namespacedtagvalue_get]
