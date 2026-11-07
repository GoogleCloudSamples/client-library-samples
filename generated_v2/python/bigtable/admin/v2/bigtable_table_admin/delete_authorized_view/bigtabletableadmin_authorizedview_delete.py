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

# [START bigtable_v2_bigtabletableadmin_authorizedview_delete]
import google.api_core.exceptions
from google.cloud import bigtable_admin_v2


def delete_authorized_view(
    project_id: str, instance_id: str, table_id: str, authorized_view_id: str
) -> None:
    """Deletes an authorized view from a Cloud Bigtable table.

    Args:
        project_id: The Google Cloud project ID.
        instance_id: The ID of the Bigtable instance containing the table.
        table_id: The ID of the Bigtable table containing the AuthorizedView.
        authorized_view_id: The ID of the AuthorizedView to delete.
    """
    client = bigtable_admin_v2.BigtableTableAdminClient()
    name = (
        f"projects/{project_id}/instances/{instance_id}/tables/{table_id}"
        f"/authorizedViews/{authorized_view_id}"
    )

    try:
        client.delete_authorized_view(name=name)
        print(f"Deleted authorized view: {authorized_view_id}")
    except google.api_core.exceptions.GoogleAPICallError as error:
        print(f"Failed to delete authorized view: {error}")
# [END bigtable_v2_bigtabletableadmin_authorizedview_delete]
