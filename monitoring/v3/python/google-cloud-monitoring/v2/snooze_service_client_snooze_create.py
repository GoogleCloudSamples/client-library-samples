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

# [START monitoring_v3_snoozeservice_snooze_create]
from datetime import datetime, timedelta, timezone
from google.api_core import exceptions
from google.cloud import monitoring_v3
from google.protobuf.timestamp_pb2 import Timestamp


def create_snooze(project_id: str, alert_policy_id: str) -> None:
    """Creates a Monitoring Snooze.

    Args:
        project_id: The Google Cloud project ID.
        alert_policy_id: The ID of the alert policy to attach.
    """
    client = monitoring_v3.SnoozeServiceClient()

    # In this example, the snooze times is the next hour, starting in one minute.
    now_utc = datetime.now(timezone.utc)
    start_time_dt = now_utc + timedelta(minutes=1)
    end_time_dt = start_time_dt + timedelta(hours=1)

    start_timestamp = Timestamp()
    start_timestamp.FromDatetime(start_time_dt)
    end_timestamp = Timestamp()
    end_timestamp.FromDatetime(end_time_dt)

    snooze_interval = monitoring_v3.TimeInterval(
        start_time=start_timestamp,
        end_time=end_timestamp,
    )

    alert_policy = client.alert_policy_path(project_id, alert_policy_id)
    criteria = monitoring_v3.Snooze.Criteria(policies=[alert_policy])
    new_snooze = monitoring_v3.Snooze(
        display_name="Python Sample Snooze for Maintenance",
        interval=snooze_interval,
        criteria=criteria,
    )

    parent = f"projects/{project_id}"

    request = monitoring_v3.CreateSnoozeRequest(
        parent=parent,
        snooze=new_snooze,
    )

    try:
        response = client.create_snooze(request=request)
        print(f"Snooze: {response.name}")
        print(f"    Display Name: {response.display_name}")
        print(f"    End Time: {response.interval.end_time}")
        print(f"    Start Time: {response.interval.start_time}")
    except exceptions.InvalidArgument as e:
        print(f"Error creating snooze: Invalid argument provided. Details: {e}")
        print("Please ensure that the snooze interval start_time is in the future ")
        print("and before the end_time, and that all required fields are valid.")
    except exceptions.AlreadyExists as e:
        print(f"Error creating snooze: A similar snooze already exists. Details: {e}")
        print("Consider checking existing snoozes or modifying the snooze parameters.")
    except Exception as e:
        print(f"An unexpected error occurred: {e}")


# [END monitoring_v3_snoozeservice_snooze_create]

if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Creates a Monitoring Snooze.")
    parser.add_argument(
        "--project_id", required=True, help="The Google Cloud project ID."
    )

    parser.add_argument(
        "--alert_policy_id",
        type=str,
        required=True,
        help="The ID of the alert policy to attach.",
    )
    args = parser.parse_args()
    create_snooze(project_id=args.project_id, alert_policy_id=args.alert_policy_id)
