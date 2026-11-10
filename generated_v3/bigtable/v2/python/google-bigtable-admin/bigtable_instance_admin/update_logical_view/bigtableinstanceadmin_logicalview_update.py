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

# [START bigtable_v2_bigtableinstanceadmin_logicalview_update]
import google.api_core.exceptions
from google.cloud import bigtable_admin_v2
from google.protobuf import field_mask_pb2

client = bigtable_admin_v2.BigtableInstanceAdminClient()


def update_logical_view(
    project_id: str, instance_id: str, logical_view_id: str
) -> None:
    """Updates a Bigtable logical view.

    Args:
        project_id: The Google Cloud project ID (for example, 'example-project-id').
        instance_id: The Bigtable instance ID (for example, 'example-instance-id').
        logical_view_id: The ID of the logical view to update.
    """
    logical_view = bigtable_admin_v2.LogicalView(
        name=f"projects/{project_id}/instances/{instance_id}/logicalViews/{logical_view_id}",
        deletion_protection=True,
    )
    update_mask = field_mask_pb2.FieldMask(paths=["deletion_protection"])

    try:
        operation = client.update_logical_view(
            logical_view=logical_view,
            update_mask=update_mask,
        )
        response = operation.result()
        print(f"Updated logical view: {response.name}")
    except google.api_core.exceptions.GoogleAPICallError as e:
        print(f"Failed to update logical view: {e}")
# [END bigtable_v2_bigtableinstanceadmin_logicalview_update]
