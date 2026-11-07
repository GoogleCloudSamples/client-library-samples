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

# [START bigtable_v2_bigtabletableadmin_backup_create]
import datetime

import google.api_core.exceptions
from google.cloud import bigtable_admin_v2

client = bigtable_admin_v2.BigtableTableAdminClient()


def create_backup(
    project_id: str,
    instance_id: str,
    cluster_id: str,
    backup_id: str,
    table_id: str,
) -> None:
    """Creates a backup of an existing Cloud Bigtable table.

    Args:
        project_id: The Google Cloud project ID (for example, 'example-project-id').
        instance_id: The ID of the Cloud Bigtable instance (for example, 'example-instance').
        cluster_id: The ID of the cluster in which the backup is stored (for example, 'example-cluster').
        backup_id: Caller-specified ID for the backup to create (for example, 'example-backup').
            Must be 1 to 50 characters matching regex [_a-zA-Z0-9][-_.a-zA-Z0-9]*.
        table_id: The ID of the source table to back up (for example, 'example-table').
            The table must exist in the specified instance.
    """
    expire_time = datetime.datetime.now(datetime.timezone.utc) + datetime.timedelta(hours=7)
    backup = bigtable_admin_v2.Backup(
        source_table=f"projects/{project_id}/instances/{instance_id}/tables/{table_id}",
        expire_time=expire_time,
    )
    parent = f"projects/{project_id}/instances/{instance_id}/clusters/{cluster_id}"

    try:
        operation = client.create_backup(
            parent=parent,
            backup_id=backup_id,
            backup=backup,
        )
        response = operation.result()
        print(f"Created backup: {response.name}")
        print(f"Source table: {response.source_table}")
        print(f"Expire time: {response.expire_time}")
    except (
        google.api_core.exceptions.AlreadyExists,
        google.api_core.exceptions.InvalidArgument,
        google.api_core.exceptions.NotFound,
        google.api_core.exceptions.GoogleAPICallError,
    ) as error:
        print(f"Failed to create backup: {error}")
# [END bigtable_v2_bigtabletableadmin_backup_create]
