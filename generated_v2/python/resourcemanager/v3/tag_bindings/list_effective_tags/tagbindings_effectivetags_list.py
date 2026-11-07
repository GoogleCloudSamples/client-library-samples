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

# [START cloudresourcemanager_v3_tagbindings_effectivetags_list]
import google.api_core.exceptions
from google.cloud import resourcemanager_v3


def list_effective_tags(project_id: str) -> None:
    """Lists effective tags for a Google Cloud project.

    Args:
        project_id: The Google Cloud project ID to query for effective tags.
    """
    client = resourcemanager_v3.TagBindingsClient()

    parent = f"//cloudresourcemanager.googleapis.com/projects/{project_id}"

    request = resourcemanager_v3.ListEffectiveTagsRequest(
        parent=parent,
    )

    try:
        response = client.list_effective_tags(request=request)
        for effective_tag in response:
            print(f"Tag value: {effective_tag.tag_value}")
            print(f"Namespaced tag value: {effective_tag.namespaced_tag_value}")
            print(f"Inherited: {effective_tag.inherited}")
    except google.api_core.exceptions.GoogleAPICallError as error:
        print(f"Error listing effective tags: {error}")
# [END cloudresourcemanager_v3_tagbindings_effectivetags_list]
