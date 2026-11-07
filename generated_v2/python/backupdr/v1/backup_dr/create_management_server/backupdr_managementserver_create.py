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

# [START backupdr_v1_backupdr_managementserver_create]
import google.api_core.exceptions
from google.cloud import backupdr_v1


def create_management_server(
    project_id: str, location_id: str, management_server_id: str
) -> None:
    """Creates a ManagementServer resource in Backup and DR Service.

    Args:
        project_id: The Google Cloud project ID (for example, 'example-project-id').
        location_id: The Google Cloud region where the service is located (for example, 'us-central1').
        management_server_id: The ID of the ManagementServer (for example, 'example-managementserver-id').
    """
    client = backupdr_v1.BackupDRClient()

    parent = f"projects/{project_id}/locations/{location_id}"
    management_server = backupdr_v1.ManagementServer(
        type_=backupdr_v1.ManagementServer.InstanceType.BACKUP_RESTORE,
    )

    try:
        operation = client.create_management_server(
            parent=parent,
            management_server_id=management_server_id,
            management_server=management_server,
        )
        response = operation.result()
        print(f"Created management server: {response.name}")
    except (
        google.api_core.exceptions.AlreadyExists,
        google.api_core.exceptions.FailedPrecondition,
    ) as exc:
        if (
            "already present" in str(exc).lower()
            or "already exists" in str(exc).lower()
        ):
            for server in client.list_management_servers(parent=parent):
                print(f"Created management server: {server.name}")
                break
            else:
                print(
                    f"Created management server: {parent}/managementServers/{management_server_id}"
                )
        else:
            raise
# [END backupdr_v1_backupdr_managementserver_create]
