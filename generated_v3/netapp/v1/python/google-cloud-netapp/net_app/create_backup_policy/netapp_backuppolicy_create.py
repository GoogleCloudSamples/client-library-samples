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

# [START netapp_v1_netapp_backuppolicy_create]
import google.api_core.exceptions
from google.cloud import netapp_v1

client = netapp_v1.NetAppClient()


def create_backup_policy(
    project_id: str, location_id: str, backup_policy_id: str
) -> None:
    """Use the create_backup_policy method

    Args:
        project_id: The Google Cloud project ID (for example, 'example-project-id')
        location_id: The Google Cloud region where the service is located (for example, 'us-central1')
        backup_policy_id: ID of the BackupPolicy (for example, 'example-backuppolicy-id')
    """
    parent = f"projects/{project_id}/locations/{location_id}"
    backup_policy = netapp_v1.BackupPolicy(
        daily_backup_limit=2,
        weekly_backup_limit=1,
        monthly_backup_limit=1,
        enabled=True,
        description="Backup policy created with Cloud NetApp volumes SDK",
    )

    try:
        operation = client.create_backup_policy(
            parent=parent,
            backup_policy=backup_policy,
            backup_policy_id=backup_policy_id,
        )
        response = operation.result()
        print(f"Created backup policy: {response.name}")
        print(f"Daily backup limit: {response.daily_backup_limit}")
        print(f"Weekly backup limit: {response.weekly_backup_limit}")
        print(f"Monthly backup limit: {response.monthly_backup_limit}")
    except google.api_core.exceptions.GoogleAPICallError as e:
        print(f"Failed to create backup policy: {e}")
# [END netapp_v1_netapp_backuppolicy_create]
