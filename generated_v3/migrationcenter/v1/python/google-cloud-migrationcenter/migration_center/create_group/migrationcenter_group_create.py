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

# [START migrationcenter_v1_migrationcenter_group_create]
import os

import google.api_core.exceptions
import google.auth
from google.cloud import migrationcenter_v1


def create_group(group_id: str) -> None:
    """Create an asset group in Migration Center.

    Args:
        group_id: ID of the Group (for example, 'example-group-id').
    """
    client = migrationcenter_v1.MigrationCenterClient()

    project_id = os.environ.get("GOOGLE_CLOUD_PROJECT")
    if not project_id:
        _, project_id = google.auth.default()

    location = "us-central1"
    parent = f"projects/{project_id}/locations/{location}"

    group = migrationcenter_v1.Group(
        display_name="Example Group",
        description="Description of the example group.",
    )

    try:
        operation = client.create_group(
            parent=parent,
            group_id=group_id,
            group=group,
        )
        response = operation.result()
        print(f"Created group: {response.name}")
    except google.api_core.exceptions.GoogleAPICallError as e:
        print(f"Failed to create group: {e.message}")
# [END migrationcenter_v1_migrationcenter_group_create]
