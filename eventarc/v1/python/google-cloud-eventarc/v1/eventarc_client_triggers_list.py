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

# [START eventarc_v1_eventarc_triggers_list]
from google.api_core import exceptions as core_exceptions
from google.cloud import eventarc_v1


def list_triggers(
    project_id: str,
    location: str,
) -> None:
    """
    Lists all Eventarc triggers in a given project and location.

    Args:
        project_id: The Google Cloud project ID.
        location: The Google Cloud region where the triggers are located (e.g., "us-central1").
    """
    client = eventarc_v1.EventarcClient()

    parent = f"projects/{project_id}/locations/{location}"

    try:
        request = eventarc_v1.ListTriggersRequest(parent=parent)

        page_result = client.list_triggers(request=request)

        print(f"Triggers in project {project_id} and location {location}:")
        found_triggers = False
        for trigger in page_result:
            found_triggers = True
            print(f"- Trigger Name: {trigger.name}")
            print(
                f"  Destination: {trigger.destination.cloud_run.service if trigger.destination.cloud_run else 'N/A'}"
            )
            print(f"  Event Filters: {len(trigger.event_filters)} filters")
            for i, event_filter in enumerate(trigger.event_filters):
                print(
                    f"    Filter {i+1}: attribute='{event_filter.attribute}', value='{event_filter.value}'"
                )

        if not found_triggers:
            print("  No triggers found.")

    except core_exceptions.GoogleAPICallError as e:
        print(f"Error listing triggers: {e}")
        if e.code == 404:
            print(
                f"Please ensure that the parent location '{location}' exists and is correctly specified."
            )
        elif e.code == 403:
            print(
                "Permission denied. Please check if the authenticated account has the necessary Eventarc Viewer (roles/eventarc.viewer) or equivalent permissions."
            )
        else:
            print(f"An unexpected API error occurred. Details: {e.message}")


# [END eventarc_v1_eventarc_triggers_list]

if __name__ == "__main__":
    parser = argparse.ArgumentParser(
        description="Lists all Eventarc triggers in a given project and location."
    )
    parser.add_argument(
        "--project_id",
        type=str,
        required=True,
        help="The Google Cloud project ID.",
    )
    parser.add_argument(
        "--location",
        type=str,
        required=True,
        help="The Google Cloud region where the triggers are located (e.g., 'us-central1').",
    )

    args = parser.parse_args()

    list_triggers(
        project_id=args.project_id,
        location=args.location,
    )
