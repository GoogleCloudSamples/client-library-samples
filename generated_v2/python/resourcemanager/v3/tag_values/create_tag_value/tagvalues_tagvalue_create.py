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

# [START cloudresourcemanager_v3_tagvalues_tagvalue_create]
from google.api_core import exceptions
from google.cloud import resourcemanager_v3


def create_tag_value(tag_key_id: str) -> None:
    """Creates a TagValue resource under a parent TagKey.

    Args:
        tag_key_id: The server-generated numeric ID of the parent TagKey (for
          example, '123456789012'), read from an existing TagKey resource.
    """
    client = resourcemanager_v3.TagValuesClient()

    tag_value = resourcemanager_v3.TagValue(
        parent=f"tagKeys/{tag_key_id}",
        short_name="production",
        description="Production environment tag value",
    )
    request = resourcemanager_v3.CreateTagValueRequest(
        tag_value=tag_value,
    )

    try:
        # CreateTagValue is a long-running operation; wait for it to complete.
        operation = client.create_tag_value(request=request)
        response = operation.result()
        print(f"Created TagValue: {response.name}")
    except exceptions.GoogleAPICallError as exc:
        print(f"Failed to create TagValue: {exc}")
# [END cloudresourcemanager_v3_tagvalues_tagvalue_create]
