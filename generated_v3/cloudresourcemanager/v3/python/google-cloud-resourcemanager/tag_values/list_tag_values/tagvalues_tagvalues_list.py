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

# [START cloudresourcemanager_v3_tagvalues_tagvalues_list]
import google.api_core.exceptions
from google.cloud import resourcemanager_v3

client = resourcemanager_v3.TagValuesClient()


def list_tag_values(tag_key_id: str) -> None:
    """Lists TagValues under a parent TagKey.

    Args:
        tag_key_id: The server-generated ID of the parent TagKey (for example, '123' in 'tagKeys/123').
    """
    parent = f"tagKeys/{tag_key_id}"

    request = resourcemanager_v3.ListTagValuesRequest(
        parent=parent,
    )

    try:
        page_result = client.list_tag_values(request=request)
        for tag_value in page_result:
            print(f"Name: {tag_value.name}")
            print(f"Short name: {tag_value.short_name}")
            print(f"Description: {tag_value.description}")
    except google.api_core.exceptions.GoogleAPICallError as error:
        print(f"Failed to list tag values: {error}")
# [END cloudresourcemanager_v3_tagvalues_tagvalues_list]
