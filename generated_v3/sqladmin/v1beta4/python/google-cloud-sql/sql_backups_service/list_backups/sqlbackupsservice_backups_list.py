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

# [START sqladmin_v1beta4_sqlbackupsservice_backups_list]
import google.api_core.exceptions
from google.cloud import sqladmin_v1beta4


def list_backups(project_id: str) -> None:
    """Lists backups in a Google Cloud project.

    Args:
        project_id: The Google Cloud project ID (for example,
          'example-project-id').
    """
    client = sqladmin_v1beta4.SqlBackupsServiceClient(transport="rest")

    parent = f"projects/{project_id}"

    request = sqladmin_v1beta4.ListBackupsRequest(
        parent=parent,
    )

    try:
        response = client.list_backups(request=request)
        for backup in response:
            print(f"Backup name: {backup.name}")
    except google.api_core.exceptions.GoogleAPICallError as e:
        print(f"API call failed: {e}")
# [END sqladmin_v1beta4_sqlbackupsservice_backups_list]
