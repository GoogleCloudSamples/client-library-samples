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

# [START netapp_v1_netapp_backuppolicy_delete]
import google.api_core.exceptions
from google.cloud import netapp_v1

client = netapp_v1.NetAppClient()


def delete_backup_policy(
    project_id: str, location_id: str, backup_policy_id: str
) -> None:
    """Use the delete_backup_policy method

    Args:
        project_id: The Google Cloud project ID (for example, 'example-project-id').
        location_id: The Google Cloud location (region) of the backup policy (for example, 'us-central1').
        backup_policy_id: The caller-chosen ID of the backup policy to delete (for example, 'sample-backup-policy'). Must contain only letters, numbers, and hyphens, starting with a letter and ending with a letter or number, with a maximum length of 63 characters.
    """
    name = f"projects/{project_id}/locations/{location_id}/backupPolicies/{backup_policy_id}"

    try:
        operation = client.delete_backup_policy(name=name)
        operation.result()
        print(f"Deleted backup policy: {name}")
    except google.api_core.exceptions.GoogleAPICallError as error:
        print(f"Failed to delete backup policy: {error}")
# [END netapp_v1_netapp_backuppolicy_delete]
