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

# [START gkebackup_v1_backupforgke_restorechannels_list]
import google.api_core.exceptions
from google.cloud import gke_backup_v1


def list_restore_channels(project_id: str, location_id: str) -> None:
    """Lists restore channels in the specified project and location.

    Args:
        project_id: The Google Cloud project ID (for example, 'example-project-id').
        location_id: The Google Cloud region where the service is located (for example, 'us-central1').
    """
    client = gke_backup_v1.BackupForGKEClient()

    parent = f"projects/{project_id}/locations/{location_id}"

    try:
        request = gke_backup_v1.ListRestoreChannelsRequest(parent=parent)
        page_result = client.list_restore_channels(request=request)

        count = 0
        for restore_channel in page_result:
            print(f"Restore channel: {restore_channel.name}")
            count += 1

        if count == 0:
            print(f"No restore channels found in {parent}.")
    except google.api_core.exceptions.GoogleAPICallError as error:
        print(f"API call failed: {error}")
# [END gkebackup_v1_backupforgke_restorechannels_list]
