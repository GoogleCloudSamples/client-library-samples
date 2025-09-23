# Copyright 2025 Google LLC
#
# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at
#
#     https://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.

import argparse

# [START monitoring_v3_snoozeservice_snooze_update]
from datetime import datetime, timedelta, timezone
from google.api_core import exceptions
from google.cloud import monitoring_v3
from google.protobuf import field_mask_pb2, timestamp_pb2


def update_snooze(
    project_id: str,
    snooze_id: str,
) -> None:
    """Updates an existing Snooze in Google Cloud Monitoring.

    Args:
        project_id: The Google Cloud project ID.
        snooze_id: The ID of the Snooze to update.
    """
    client = monitoring_v3.SnoozeServiceClient()
    snooze_name = client.snooze_path(project_id, snooze_id)

    new_display_name = "My new display name for Snooze"

    # As an example, the new end timestamp will be 1 hour from now.
    new_end_datetime = datetime.now(timezone.utc) + timedelta(minutes=60)
    new_end_timestamp = timestamp_pb2.Timestamp()
    new_end_timestamp.FromDatetime(new_end_datetime)

    # The 'name' field is required to identify the snooze to update.
    # Only include the fields you intend to update.
    updated_snooze = monitoring_v3.Snooze(
        name=snooze_name,
        display_name=new_display_name,
        interval=monitoring_v3.TimeInterval(end_time=new_end_timestamp),
    )

    # Fields not listed in the update_mask will retain their original values.
    # Fields listed in the update_mask but not present in the `updated_snooze`
    # object will be reset to their default values.
    update_mask = field_mask_pb2.FieldMask(paths=["display_name", "interval.end_time"])

    try:
        response = client.update_snooze(snooze=updated_snooze, update_mask=update_mask)
        print(f"Snooze: {response.name}")
        print(f"    New Display Name: {response.display_name}")
        print(f"    New End Time: {response.interval.end_time} (UTC)")
    except exceptions.NotFound:
        print(
            f"Error: Snooze '{snooze_name}' not found. Please ensure the snooze_id is correct."
        )
    except exceptions.InvalidArgument as e:
        print(
            f"Error: Invalid argument provided for updating snooze '{snooze_name}'. Details: {e}"
        )
    except Exception as e:
        print(f"An unexpected error occurred: {e}")


# [END monitoring_v3_snoozeservice_snooze_update]

if __name__ == "__main__":
    parser = argparse.ArgumentParser(
        description="Updates an existing Snooze in Google Cloud Monitoring."
    )
    parser.add_argument(
        "--project_id", required=True, help="The Google Cloud project ID."
    )
    parser.add_argument(
        "--snooze_id", required=True, help="The ID of the Snooze to update."
    )
    args = parser.parse_args()

    update_snooze(project_id=args.project_id, snooze_id=args.snooze_id)
