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

# [START cloudresourcemanager_v3_tagbindings_tagbinding_create]
import google.api_core.exceptions
from google.cloud import resourcemanager_v3


def create_tag_binding(project_id: str, tag_value_id: str) -> None:
    """Creates a tag binding between a TagValue and a Google Cloud project.

    Args:
        project_id: The Google Cloud project ID of the resource to bind the tag to. Provide an existing project ID.
        tag_value_id: The server-generated ID of the TagValue to bind to the parent resource. Read from an existing TagValue resource.
    """
    client = resourcemanager_v3.TagBindingsClient()

    tag_binding = resourcemanager_v3.TagBinding(
        parent=f"//cloudresourcemanager.googleapis.com/projects/{project_id}",
        tag_value=f"tagValues/{tag_value_id}",
    )

    try:
        operation = client.create_tag_binding(tag_binding=tag_binding)
        response = operation.result()
        print(f"Created tag binding: {response.name}")
    except google.api_core.exceptions.GoogleAPICallError as error:
        print(f"Failed to create tag binding: {error}")
# [END cloudresourcemanager_v3_tagbindings_tagbinding_create]
