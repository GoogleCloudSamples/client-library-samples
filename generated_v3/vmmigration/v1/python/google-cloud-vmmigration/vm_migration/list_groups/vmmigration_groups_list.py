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

# [START vmmigration_v1_vmmigration_groups_list]
import os

import google.api_core.exceptions
from google.cloud import vmmigration_v1


def list_groups() -> None:
    """Lists migration groups in a specified location."""
    client = vmmigration_v1.VmMigrationClient()

    project_id = os.environ.get("GOOGLE_CLOUD_PROJECT", "example-project-id")
    location = os.environ.get("GOOGLE_CLOUD_LOCATION", "us-central1")
    parent = f"projects/{project_id}/locations/{location}"
    page_token = ""

    request = vmmigration_v1.ListGroupsRequest(
        parent=parent,
        page_token=page_token,
    )

    try:
        response = client.list_groups(request=request)
        for group in response:
            print(f"Group name: {group.name}")
            print(f"Display name: {group.display_name}")
    except google.api_core.exceptions.GoogleAPICallError as error:
        print(f"Failed to list groups: {error}")
# [END vmmigration_v1_vmmigration_groups_list]
