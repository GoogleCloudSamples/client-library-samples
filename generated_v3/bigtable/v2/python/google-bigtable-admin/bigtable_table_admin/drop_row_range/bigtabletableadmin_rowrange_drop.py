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

# [START bigtable_v2_bigtabletableadmin_drop_row_range]
from google.api_core import exceptions
from google.cloud import bigtable_admin_v2


def drop_row_range(
    project_id: str, instance_id: str, table_id: str, row_key_prefix: bytes
) -> None:
    """Drop rows from a table that match the specified row key prefix.

    Args:
        project_id: The Google Cloud project ID (for example, 'example-project-id').
        instance_id: ID of the Instance (for example, 'example-instance-id').
        table_id: ID of the Table (for example, 'example-table-id').
        row_key_prefix: The row key prefix specifying the range of rows to drop.
    """
    client = bigtable_admin_v2.BigtableTableAdminClient()

    name = f"projects/{project_id}/instances/{instance_id}/tables/{table_id}"

    request = bigtable_admin_v2.DropRowRangeRequest(
        name=name,
        row_key_prefix=row_key_prefix,
    )

    try:
        client.drop_row_range(request=request)
        print(
            f"Dropped row range with prefix '{row_key_prefix}' from table '{table_id}'."
        )
    except exceptions.GoogleAPICallError as e:
        print(f"Failed to drop row range: {e}")
# [END bigtable_v2_bigtabletableadmin_drop_row_range]
