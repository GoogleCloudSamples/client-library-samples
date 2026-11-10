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

# [START cloudresourcemanager_v3_tagvalues_tagvalue_update]
import google.api_core.exceptions
from google.cloud import resourcemanager_v3
from google.protobuf import field_mask_pb2


def update_tag_value(tag_value_id: str) -> None:
    """Updates an existing TagValue resource.

    Args:
        tag_value_id: The server-generated ID of the TagValue to update.
    """
    client = resourcemanager_v3.TagValuesClient()

    tag_value = resourcemanager_v3.TagValue(
        name=f"tagValues/{tag_value_id}",
        description="Updated description for tag value.",
    )
    update_mask = field_mask_pb2.FieldMask(paths=["description"])

    try:
        operation = client.update_tag_value(
            tag_value=tag_value,
            update_mask=update_mask,
        )
        response = operation.result()
        print(f"Updated tag value: {response.name}")
    except google.api_core.exceptions.GoogleAPICallError as e:
        print(f"API call failed: {e}")
# [END cloudresourcemanager_v3_tagvalues_tagvalue_update]
