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

# [START netapp_v1_netapp_backuppolicy_update]
import google.api_core.exceptions
from google.cloud import netapp_v1
from google.protobuf import field_mask_pb2

client = netapp_v1.NetAppClient()


def update_backup_policy(
    project_id: str, location_id: str, backup_policy_id: str
) -> None:
    """Use the update_backup_policy method.

    Args:
        project_id: The Google Cloud project ID.
        location_id: The Google Cloud region (for example, 'us-central1').
        backup_policy_id: The ID of the backup policy to update. Sourced from a
          pre-existing BackupPolicy resource.
    """
    backup_policy = netapp_v1.BackupPolicy(
        name=f"projects/{project_id}/locations/{location_id}/backupPolicies/{backup_policy_id}",
        description="Updated backup policy description",
    )
    update_mask = field_mask_pb2.FieldMask(paths=["description"])

    try:
        operation = client.update_backup_policy(
            backup_policy=backup_policy,
            update_mask=update_mask,
        )
        response = operation.result()
        print(f"Updated backup policy: {response.name}")
        print(f"Description: {response.description}")
    except google.api_core.exceptions.GoogleAPICallError as exc:
        print(f"Failed to update backup policy: {exc}")


# [END netapp_v1_netapp_backuppolicy_update]
