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

# [START monitoring_v3_snoozeservice_get_snooze]
from google.api_core import exceptions
from google.cloud import monitoring_v3


def get_snooze(project_id: str, snooze_id: str) -> None:
    """
    Retrieves a specific Snooze by its ID.

    Args:
        project_id: The Google Cloud project ID.
        snooze_id: The ID of the Snooze to retrieve.
    """
    client = monitoring_v3.SnoozeServiceClient()

    snooze_name = client.snooze_path(project_id, snooze_id)

    try:
        request = monitoring_v3.GetSnoozeRequest(name=snooze_name)

        snooze = client.get_snooze(request=request)

        print(f"Snooze: {snooze.name}")
        if snooze.criteria.policies:
            print(f"    Alert Policies: {', '.join(snooze.criteria.policies)}")
        print(f"    Display Name: {snooze.display_name}")
        if snooze.criteria.filter:
            print(f"    Filter: {snooze.criteria.filter}")
        print(f"    Interval End Time: {snooze.interval.end_time}")
        print(f"    Interval Start Time: {snooze.interval.start_time}")

    except exceptions.NotFound:
        print(
            f"Error: Snooze '{snooze_name}' not found. Please check the project ID and snooze ID."
        )
    except Exception as e:
        print(f"An unexpected error occurred: {e}")
        print(
            "Please ensure the Snooze ID is correct and the service account has the necessary permissions."
        )


# [END monitoring_v3_snoozeservice_get_snooze]

if __name__ == "__main__":
    parser = argparse.ArgumentParser(
        description="Retrieves a specific Snooze by its ID."
    )
    parser.add_argument(
        "--project_id",
        type=str,
        required=True,
        help="The Google Cloud project ID.",
    )
    parser.add_argument(
        "--snooze_id",
        type=str,
        required=True,
        help="The ID of the Snooze to retrieve.",
    )
    args = parser.parse_args()
    get_snooze(project_id=args.project_id, snooze_id=args.snooze_id)
