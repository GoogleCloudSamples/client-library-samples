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

# [START bigtable_v2_bigtabletableadmin_table_create]
import google.api_core.exceptions
from google.cloud import bigtable_admin_v2

client = bigtable_admin_v2.BigtableTableAdminClient()


def create_table(project_id: str, instance_id: str, table_id: str) -> None:
    """Creates a Cloud Bigtable table with an initial column family.

    Args:
        project_id: The Google Cloud project ID (for example, 'example-project-id').
        instance_id: The ID of the existing Bigtable instance (for example, 'example-instance-id').
        table_id: The caller-chosen unique ID for the new table (for example, 'example-table-id'), maximum 50 characters.
    """
    parent = f"projects/{project_id}/instances/{instance_id}"
    table = bigtable_admin_v2.Table(
        column_families={
            "cf1": bigtable_admin_v2.ColumnFamily(
                gc_rule=bigtable_admin_v2.GcRule(max_num_versions=1)
            )
        },
        granularity=bigtable_admin_v2.Table.TimestampGranularity.MILLIS,
    )

    try:
        response = client.create_table(
            parent=parent,
            table_id=table_id,
            table=table,
        )
        print(f"Created table: {response.name}")
    except google.api_core.exceptions.GoogleAPICallError as error:
        print(f"Failed to create table: {error}")
# [END bigtable_v2_bigtabletableadmin_table_create]
