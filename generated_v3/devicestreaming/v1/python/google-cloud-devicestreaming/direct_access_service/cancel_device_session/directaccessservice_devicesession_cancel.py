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

# [START devicestreaming_v1_directaccessservice_devicesession_cancel]
import google.api_core.exceptions
from google.cloud import devicestreaming_v1

client = devicestreaming_v1.DirectAccessServiceClient()


def cancel_device_session(project_id: str, device_session_id: str) -> None:
    """Cancels an active device session.

    Args:
        project_id: The Google Cloud project ID.
        device_session_id: The ID of the device session to cancel.
    """
    name = f"projects/{project_id}/deviceSessions/{device_session_id}"

    request = devicestreaming_v1.CancelDeviceSessionRequest(
        name=name,
    )

    try:
        client.cancel_device_session(request=request)
        print(f"Canceled device session: {name}")
    except google.api_core.exceptions.GoogleAPICallError as error:
        print(f"Error canceling device session: {error}")


# [END devicestreaming_v1_directaccessservice_devicesession_cancel]
