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

# [START cloudresourcemanager_v3_tagvalues_tagvalue_delete]
from google.api_core import exceptions
from google.cloud import resourcemanager_v3


def delete_tag_value(tag_value_id: str) -> None:
    """Deletes a TagValue resource.

    Args:
        tag_value_id: The server-assigned ID of the TagValue to delete (for
          example, '123456789012').
    """
    client = resourcemanager_v3.TagValuesClient()

    name = f"tagValues/{tag_value_id}"

    request = resourcemanager_v3.DeleteTagValueRequest(
        name=name,
    )

    try:
        # DeleteTagValue is a long-running operation; wait for it to complete.
        operation = client.delete_tag_value(request=request)
        print(f"Waiting for operation {operation.operation.name} to complete...")
        response = operation.result()
        print(f"Deleted TagValue: {response.name}")
    except exceptions.GoogleAPICallError as error:
        print(f"Failed to delete TagValue: {error}")
# [END cloudresourcemanager_v3_tagvalues_tagvalue_delete]
