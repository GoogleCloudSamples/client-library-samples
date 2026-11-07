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

# [START apphub_list_service_project_attachments]
from google.api_core import exceptions
from google.cloud import apphub_v1


def list_service_project_attachments(project_id: str, location_id: str) -> None:
    """Lists service project attachments in AppHub.

    Args:
        project_id: The Google Cloud project ID (for example, 'example-project-id').
        location_id: The Google Cloud location (for example, 'us-central1').
    """
    client = apphub_v1.AppHubClient()
    parent = f"projects/{project_id}/locations/{location_id}"

    try:
        response = client.list_service_project_attachments(parent=parent)
        attachments = list(response)
        if not attachments:
            print("No service project attachments found.")
        else:
            for attachment in attachments:
                print(f"Attachment name: {attachment.name}")
                print(f"Service project: {attachment.service_project}")
    except exceptions.GoogleAPICallError as e:
        print(f"Failed to list service project attachments: {e}")


# [END apphub_list_service_project_attachments]
