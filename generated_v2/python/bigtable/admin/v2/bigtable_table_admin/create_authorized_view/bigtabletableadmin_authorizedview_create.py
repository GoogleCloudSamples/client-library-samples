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

# [START bigtable_v2_bigtabletableadmin_authorizedview_create]
import google.api_core.exceptions
from google.cloud import bigtable_admin_v2

client = bigtable_admin_v2.BigtableTableAdminClient()


def create_authorized_view(
    project_id: str,
    instance_id: str,
    table_id: str,
    authorized_view_id: str,
) -> None:
    """Create an authorized view for a Cloud Bigtable table.

    Args:
        project_id: The Google Cloud project ID (for example, 'example-project-id').
        instance_id: ID of the Bigtable instance (for example, 'example-instance-id').
        table_id: ID of the Bigtable table (for example, 'example-table-id').
        authorized_view_id: Identifier for the authorized view (for example, 'example-authorized-view').
    """
    parent = f"projects/{project_id}/instances/{instance_id}/tables/{table_id}"
    subset_view = bigtable_admin_v2.AuthorizedView.SubsetView(
        row_prefixes=[b"example-prefix#"]
    )
    authorized_view = bigtable_admin_v2.AuthorizedView(subset_view=subset_view)

    try:
        operation = client.create_authorized_view(
            parent=parent,
            authorized_view_id=authorized_view_id,
            authorized_view=authorized_view,
        )
        response = operation.result()
        print(f"Created authorized view: {response.name}")
    except google.api_core.exceptions.GoogleAPICallError as e:
        print(f"Failed to create authorized view: {e}")
# [END bigtable_v2_bigtabletableadmin_authorizedview_create]
