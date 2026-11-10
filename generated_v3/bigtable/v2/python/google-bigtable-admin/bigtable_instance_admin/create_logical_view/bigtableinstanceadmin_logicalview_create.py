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

# [START bigtable_v2_bigtableinstanceadmin_logicalview_create]
import google.api_core.exceptions
from google.cloud import bigtable_admin_v2


def create_logical_view(
    project_id: str, instance_id: str, logical_view_id: str
) -> None:
    """Creates a Bigtable logical view.

    Args:
        project_id: The Google Cloud project ID.
        instance_id: The ID of the existing Bigtable instance.
        logical_view_id: The caller-chosen ID for the new logical view.
    """
    client = bigtable_admin_v2.BigtableInstanceAdminClient()

    parent = f"projects/{project_id}/instances/{instance_id}"
    logical_view = bigtable_admin_v2.LogicalView(query="SELECT 1 AS id")

    try:
        operation = client.create_logical_view(
            parent=parent,
            logical_view_id=logical_view_id,
            logical_view=logical_view,
        )
        response = operation.result()
        print(f"Created logical view: {response.name}")
    except google.api_core.exceptions.GoogleAPICallError as e:
        print(f"Failed to create logical view: {e}")
# [END bigtable_v2_bigtableinstanceadmin_logicalview_create]
