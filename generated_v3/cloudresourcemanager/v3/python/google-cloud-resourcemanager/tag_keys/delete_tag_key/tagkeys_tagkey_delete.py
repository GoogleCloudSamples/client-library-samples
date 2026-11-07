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

# [START cloudresourcemanager_v3_tagkeys_tagkey_delete]
from google.api_core import exceptions
from google.cloud import resourcemanager_v3


def delete_tag_key(tag_key_id: str) -> None:
    """Deletes a TagKey resource.

    Args:
        tag_key_id: The server-generated numeric ID of the TagKey to delete (for example, '123456789012').
    """
    client = resourcemanager_v3.TagKeysClient()

    name = f"tagKeys/{tag_key_id}"
    request = resourcemanager_v3.DeleteTagKeyRequest(name=name)

    try:
        operation = client.delete_tag_key(request=request)
        response = operation.result()
        print(f"Deleted TagKey: {response.name}")
    except exceptions.GoogleAPICallError as e:
        print(f"Operation failed: {e}")
# [END cloudresourcemanager_v3_tagkeys_tagkey_delete]
