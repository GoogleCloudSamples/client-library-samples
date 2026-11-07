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

# [START monitoring_v3_snoozeservice_snooze_update]
import google.api_core.exceptions
from google.cloud import monitoring_v3
from google.protobuf import field_mask_pb2

client = monitoring_v3.SnoozeServiceClient()


def update_snooze(project_id: str, snooze_id: str) -> None:
    """Use the update_snooze method

    Args:
        project_id: The Google Cloud project ID.
        snooze_id: The server-generated ID of the Snooze to update. Obtain this
          from a previous CreateSnooze or ListSnoozes response.
    """
    snooze_name = f"projects/{project_id}/snoozes/{snooze_id}"
    snooze = monitoring_v3.Snooze(
        name=snooze_name,
        display_name="Updated Snooze Display Name",
    )
    update_mask = field_mask_pb2.FieldMask(paths=["display_name"])

    try:
        response = client.update_snooze(
            snooze=snooze,
            update_mask=update_mask,
        )
        print(f"Updated snooze: {response.name}")
        print(f"Display name: {response.display_name}")
    except google.api_core.exceptions.GoogleAPICallError as exc:
        print(f"Request failed: {exc.message}")
# [END monitoring_v3_snoozeservice_snooze_update]
