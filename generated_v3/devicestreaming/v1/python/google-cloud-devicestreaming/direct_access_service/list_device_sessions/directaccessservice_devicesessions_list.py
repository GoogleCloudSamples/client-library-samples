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

# [START devicestreaming_v1_directaccessservice_devicesessions_list]
import google.api_core.exceptions
from google.cloud import devicestreaming_v1

client = devicestreaming_v1.DirectAccessServiceClient()


def list_device_sessions(project_id: str) -> None:
    """List device sessions in a Google Cloud project.

    Args:
        project_id: The Google Cloud project ID.
    """
    parent = f"projects/{project_id}"

    request = devicestreaming_v1.ListDeviceSessionsRequest(
        parent=parent,
    )

    try:
        page_result = client.list_device_sessions(request=request)
        for session in page_result:
            print(f"Session name: {session.name}")
            print(f"Device display name: {session.display_name}")
            print(f"State: {session.state.name}")
    except google.api_core.exceptions.GoogleAPICallError as error:
        print(f"Failed to list device sessions: {error.message}")
# [END devicestreaming_v1_directaccessservice_devicesessions_list]
