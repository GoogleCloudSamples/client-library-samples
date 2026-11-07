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

# [START devicestreaming_v1_directaccessservice_devicesession_get]
import google.api_core.exceptions
from google.cloud import devicestreaming_v1

client = devicestreaming_v1.DirectAccessServiceClient()


def get_device_session(project_id: str, device_session_id: str) -> None:
    """Gets details of an existing DeviceSession.

    Args:
        project_id: The Google Cloud project ID (for example, 'example-project-id').
        device_session_id: The identifier of the DeviceSession (for example, 'example-device-session-id').
    """
    name = f"projects/{project_id}/deviceSessions/{device_session_id}"

    try:
        response = client.get_device_session(name=name)
        print(f"Device session name: {response.name}")
        print(f"Device session state: {response.state}")
    except google.api_core.exceptions.GoogleAPICallError as e:
        print(f"API call failed: {e}")
# [END devicestreaming_v1_directaccessservice_devicesession_get]
