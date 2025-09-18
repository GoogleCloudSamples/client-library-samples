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

# [START eventarc_v1_eventarc_messagebusenrollments_list]
from google.api_core import exceptions
from google.cloud import eventarc_v1


def list_message_bus_enrollments(
    project_id: str, location: str, message_bus_id: str
) -> None:
    """
    Lists message bus enrollments for a given message bus.

    Args:
        project_id: The Google Cloud project ID.
        location: The location of the message bus (e.g., "us-central1").
        message_bus_id: The ID of the message bus to list enrollments for.
    """
    client = eventarc_v1.EventarcClient()

    parent = client.message_bus_path(project_id, location, message_bus_id)

    try:
        page_result = client.list_message_bus_enrollments(parent=parent)

        print(f"Message Bus Enrollments for {parent}:")
        found_enrollments = False
        for enrollment_name in page_result:
            print(f"- {enrollment_name}")
            found_enrollments = True

        if not found_enrollments:
            print("No message bus enrollments found.")

    except exceptions.NotFound as e:
        print(
            f"Error: The specified message bus '{parent}' was not found. "
            f"Ensure the message bus exists and the project/location are correct. Details: {e}"
        )
    except exceptions.InvalidArgument as e:
        print(
            f"Error: Invalid argument provided. Please check the format of project ID, "
            f"location, and message bus ID. Details: {e}"
        )
    except Exception as e:
        print(f"An unexpected error occurred: {e}")


# [END eventarc_v1_eventarc_messagebusenrollments_list]

if __name__ == "__main__":
    parser = argparse.ArgumentParser(
        description="Lists message bus enrollments for a given message bus."
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
        help="The location of the message bus (e.g., 'us-central1').",
    )
    parser.add_argument(
        "--message_bus_id",
        type=str,
        required=True,
        help="The ID of the message bus to list enrollments for.",
    )

    args = parser.parse_args()

    list_message_bus_enrollments(args.project_id, args.location, args.message_bus_id)
