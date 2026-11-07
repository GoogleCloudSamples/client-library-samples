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

# [START cloudresourcemanager_v3_tagbindings_tagbinding_delete]
import google.api_core.exceptions
from google.cloud import resourcemanager_v3


def delete_tag_binding(tag_binding_id: str) -> None:
    """Deletes an existing tag binding.

    Args:
        tag_binding_id: The server-generated identifier of the TagBinding.
    """
    client = resourcemanager_v3.TagBindingsClient()
    name = f"tagBindings/{tag_binding_id}"

    try:
        request = resourcemanager_v3.DeleteTagBindingRequest(name=name)
        operation = client.delete_tag_binding(request=request)
        # Wait for the long-running operation to complete.
        operation.result()
        print(f"Deleted tag binding: {name}")
    except google.api_core.exceptions.GoogleAPICallError as exc:
        print(f"Failed to delete tag binding: {exc}")
# [END cloudresourcemanager_v3_tagbindings_tagbinding_delete]
