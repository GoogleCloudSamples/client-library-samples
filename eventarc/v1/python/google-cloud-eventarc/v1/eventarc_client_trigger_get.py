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

# [START eventarc_v1_eventarc_trigger_get]
from google.api_core import exceptions
from google.cloud import eventarc_v1


def get_eventarc_trigger(
    project_id: str,
    location: str,
    trigger_id: str,
) -> None:
    """
    Retrieves the details of a specific Eventarc trigger.

    This sample demonstrates how to use the Eventarc client library to fetch
    information about an existing trigger. Triggers are resources that define
    what events to listen for and where to send them.

    Args:
        project_id: The Google Cloud project ID.
        location: The region where the trigger is located (e.g., "us-central1").
        trigger_id: The ID of the trigger to retrieve.
    """
    client = eventarc_v1.EventarcClient()

    trigger_name = client.trigger_path(project_id, location, trigger_id)

    try:
        trigger = client.get_trigger(name=trigger_name)

        print(f"Successfully retrieved trigger: {trigger.name}")
        print(f"  UID: {trigger.uid}")
        print(f"  Destination: {trigger.destination}")
        if trigger.event_filters:
            print("  Event Filters:")
            for ef in trigger.event_filters:
                print(f"    - Attribute: {ef.attribute}, Value: {ef.value}")

    except exceptions.NotFound:
        print(f"Error: Trigger '{trigger_name}' not found.")
        print("Ensure the project ID, location, and trigger ID are correct.")
    except exceptions.GoogleAPICallError as e:
        print(f"An API error occurred: {e}")
        print("Please check your project permissions and network connectivity.")
    except Exception as e:
        print(f"An unexpected error occurred: {e}")


# [END eventarc_v1_eventarc_trigger_get]


if __name__ == "__main__":
    parser = argparse.ArgumentParser(
        description="Retrieve details of an Eventarc trigger."
    )
    parser.add_argument(
        "--project_id", required=True, help="The Google Cloud project ID."
    )
    parser.add_argument(
        "--location",
        required=True,
        help="The region where the trigger is located (e.g., 'us-central1').",
    )
    parser.add_argument(
        "--trigger_id", required=True, help="The ID of the trigger to retrieve."
    )

    args = parser.parse_args()

    get_eventarc_trigger(args.project_id, args.location, args.trigger_id)
