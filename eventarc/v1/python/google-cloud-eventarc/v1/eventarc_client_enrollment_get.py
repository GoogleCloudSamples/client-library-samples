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

# [START eventarc_v1_eventarc_enrollment_get]
from google.api_core import exceptions
from google.cloud import eventarc_v1


def get_enrollment(
    project_id: str,
    location: str,
    enrollment_id: str,
) -> None:
    """
    Retrieves a specific Eventarc enrollment.

    This sample demonstrates how to retrieve an Eventarc enrollment by its full resource name.
    It shows how to handle a `NotFound` error if the enrollment does not exist,
    and how to gracefully handle other API-related errors without crashing.

    Args:
        project_id: The Google Cloud project ID.
        location: The location of the enrollment (e.g., `us-central1`).
        enrollment_id: The ID of the enrollment to retrieve.
    """
    client = eventarc_v1.EventarcClient()
    name = client.enrollment_path(project_id, location, enrollment_id)

    try:
        enrollment = client.get_enrollment(name=name)
        print(f"Successfully retrieved enrollment: {enrollment.name}")
        print(f"  Display Name: {enrollment.display_name}")
        print(f"  Message Bus: {enrollment.message_bus}")
        print(f"  Destination: {enrollment.destination}")
        print(f"  CEL Match: {enrollment.cel_match}")
    except exceptions.NotFound:
        print(f"Error: Enrollment '{name}' not found.")
        print(
            "Action: Ensure the project ID, location, and enrollment ID are correct and the enrollment exists."
        )
    except exceptions.GoogleAPICallError as e:
        print(f"An API error occurred: {e}")
        print(
            "Action: Check your network connection, project permissions, or the API request parameters."
        )
    except Exception as e:
        print(f"An unexpected error occurred: {e}")
        print(
            "Action: Review the error message and consult the Eventarc documentation or support."
        )


# [END eventarc_v1_eventarc_enrollment_get]

if __name__ == "__main__":
    parser = argparse.ArgumentParser(
        description="Retrieves a specific Eventarc enrollment."
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
        help="The location of the enrollment (e.g., `us-central1`).",
    )
    parser.add_argument(
        "--enrollment_id",
        type=str,
        required=True,
        help="The ID of the enrollment to retrieve.",
    )
    args = parser.parse_args()

    get_enrollment(
        args.project_id,
        args.location,
        args.enrollment_id,
    )
