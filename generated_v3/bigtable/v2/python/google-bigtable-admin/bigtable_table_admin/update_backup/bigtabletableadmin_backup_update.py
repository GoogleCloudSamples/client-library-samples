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

# [START bigtable_v2_bigtabletableadmin_backup_update]
from datetime import datetime, timedelta, timezone

import google.api_core.exceptions
from google.cloud import bigtable_admin_v2
from google.protobuf import field_mask_pb2
from google.protobuf import timestamp_pb2


def update_backup(
    project_id: str, instance_id: str, cluster_id: str, backup_id: str
) -> None:
    """Updates the expiration time of an existing Cloud Bigtable backup.

    Args:
        project_id: The Google Cloud project ID.
        instance_id: The ID of the Cloud Bigtable instance hosting the cluster
          and backup.
        cluster_id: The ID of the Cloud Bigtable cluster where the backup is
          located.
        backup_id: The ID of the backup to update.
    """
    client = bigtable_admin_v2.BigtableTableAdminClient()

    # Expiration time must be between 6 hours and 90 days after backup creation time.
    expire_time = timestamp_pb2.Timestamp()
    expire_time.FromDatetime(datetime.now(timezone.utc) + timedelta(days=7))

    backup = bigtable_admin_v2.Backup(
        name=f"projects/{project_id}/instances/{instance_id}/clusters/{cluster_id}/backups/{backup_id}",
        expire_time=expire_time,
    )
    update_mask = field_mask_pb2.FieldMask(paths=["expire_time"])

    try:
        response = client.update_backup(backup=backup, update_mask=update_mask)
        print(f"Updated backup: {response.name}")
        print(f"Expire time: {response.expire_time}")
    except google.api_core.exceptions.GoogleAPICallError as error:
        print(f"Failed to update backup: {error}")
# [END bigtable_v2_bigtabletableadmin_backup_update]
