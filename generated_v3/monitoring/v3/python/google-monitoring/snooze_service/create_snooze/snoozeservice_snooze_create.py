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

# [START monitoring_v3_snoozeservice_snooze_create]
from datetime import datetime, timedelta, timezone

import google.api_core.exceptions
from google.cloud import monitoring_v3

client = monitoring_v3.SnoozeServiceClient()


def create_snooze(alert_policy_id: str, project_id: str) -> None:
    """Use the create_snooze method

    Args:
        alert_policy_id: Server-generated ID of the existing AlertPolicy to snooze.
        project_id: The Google Cloud project ID where the snooze will be created.
    """
    parent = f"projects/{project_id}"

    start_time = datetime.now(timezone.utc) + timedelta(minutes=1)
    end_time = start_time + timedelta(hours=1)

    snooze = monitoring_v3.Snooze(
        display_name="Maintenance Window Snooze",
        criteria=monitoring_v3.Snooze.Criteria(
            policies=[f"projects/{project_id}/alertPolicies/{alert_policy_id}"]
        ),
        interval=monitoring_v3.TimeInterval(
            start_time=start_time,
            end_time=end_time,
        ),
    )

    try:
        response = client.create_snooze(parent=parent, snooze=snooze)
        print(f"Created snooze: {response.name}")
    except google.api_core.exceptions.GoogleAPICallError as exc:
        print(f"Failed to create snooze: {exc}")
# [END monitoring_v3_snoozeservice_snooze_create]
