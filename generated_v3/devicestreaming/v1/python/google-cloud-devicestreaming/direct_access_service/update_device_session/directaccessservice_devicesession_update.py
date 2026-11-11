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

# [START devicestreaming_v1_directaccessservice_devicesession_update]
import google.api_core.exceptions
from google.cloud import devicestreaming_v1
from google.protobuf import duration_pb2
from google.protobuf import field_mask_pb2

client = devicestreaming_v1.DirectAccessServiceClient()


def update_device_session(project_id: str, device_session_id: str) -> None:
    """Updates the expiration duration of an active device session.

    Args:
        project_id: The Google Cloud project ID (for example, 'example-project-id').
        device_session_id: The ID of the DeviceSession (for example, 'example-device-session').
    """
    session_name = f"projects/{project_id}/deviceSessions/{device_session_id}"
    device_session = devicestreaming_v1.DeviceSession(
        name=session_name,
        ttl=duration_pb2.Duration(seconds=1200),
    )
    update_mask = field_mask_pb2.FieldMask(paths=["ttl"])

    try:
        response = client.update_device_session(
            device_session=device_session,
            update_mask=update_mask,
        )
        print(f"Updated device session: {response.name}")
        print(f"Session state: {response.state}")
    except google.api_core.exceptions.GoogleAPICallError as e:
        print(f"API call failed: {e}")
# [END devicestreaming_v1_directaccessservice_devicesession_update]
