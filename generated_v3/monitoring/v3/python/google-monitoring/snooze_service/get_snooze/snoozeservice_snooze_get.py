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

# [START monitoring_v3_snoozeservice_snooze_get]
import google.api_core.exceptions
from google.cloud import monitoring_v3

client = monitoring_v3.SnoozeServiceClient()


def get_snooze(snooze_id: str, project_id: str) -> None:
    """Retrieves a snooze resource by its identifier.

    Args:
        snooze_id: The system-assigned Snooze ID. This ID is server-generated;
          obtain it from a previous CreateSnooze or ListSnoozes response.
        project_id: The Google Cloud project ID.
    """
    name = f"projects/{project_id}/snoozes/{snooze_id}"

    try:
        response = client.get_snooze(name=name)
        print(f"Retrieved snooze: {response.name}")
        print(f"Display name: {response.display_name}")
    except google.api_core.exceptions.GoogleAPICallError as e:
        print(f"Failed to retrieve snooze: {e}")


# [END monitoring_v3_snoozeservice_snooze_get]
