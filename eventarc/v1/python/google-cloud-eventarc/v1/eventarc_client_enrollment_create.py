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

# [START eventarc_v1_eventarc_enrollment_create]
from google.api_core import exceptions as core_exceptions
from google.cloud import eventarc_v1


def create_enrollment(
    project_id: str,
    location: str,
    message_bus_id: str,
    enrollment_id: str,
    destination_pipeline_id: str,
) -> None:
    """
    Creates a new Eventarc enrollment.

    An enrollment represents a subscription for messages on a particular message
    bus, defining criteria for matching messages and the subscriber endpoint
    (a pipeline) where matched messages should be delivered.

    Args:
        project_id: The Google Cloud project ID.
        location: The Google Cloud region where the enrollment will be created (e.g., "us-central1").
        message_bus_id: The ID of the message bus to subscribe to.
        enrollment_id: The user-provided ID for the new enrollment.
        destination_pipeline_id: The ID of the pipeline to which matched messages will be delivered.
    """
    client = eventarc_v1.EventarcClient()

    message_bus_name = client.message_bus_path(project_id, location, message_bus_id)

    destination_pipeline_name = client.pipeline_path(
        project_id, location, destination_pipeline_id
    )

    enrollment = eventarc_v1.Enrollment(
        cel_match="true",  # Matches all messages on bus
        message_bus=message_bus_name,
        destination=destination_pipeline_name,
        display_name=f"Enrollment for {enrollment_id}",
    )

    parent = client.common_location_path(project_id, location)

    request = eventarc_v1.CreateEnrollmentRequest(
        parent=parent,
        enrollment=enrollment,
        enrollment_id=enrollment_id,
    )

    try:
        operation = client.create_enrollment(request=request)
        response = operation.result()

        print(f"Enrollment created: {response.name}")
        print(f"  UID: {response.uid}")
        print(f"  Display Name: {response.display_name}")
        print(f"  CEL Match: {response.cel_match}")
        print(f"  Message Bus: {response.message_bus}")
        print(f"  Destination Pipeline: {response.destination}")
        print(f"  Create Time: {response.create_time}")

    except core_exceptions.AlreadyExists as e:
        print(f"Error: Enrollment '{enrollment_id}' already exists in '{parent}'.")
        print("Please choose a different enrollment ID or delete the existing one.")
        print(f"Details: {e}")
    except core_exceptions.NotFound as e:
        print(f"Error:The specified resource was not found.")
        print(
            f"Ensure the project_id, location, message_bus_id, and destination_pipeline_id are correct and the resources exist."
        )
        print(f"Details: {e}")
    except core_exceptions.InvalidArgument as e:
        print(f"Error: Invalid argument provided in the request.")
        print(
            f"Check the format of message_bus_id, enrollment_id, destination_pipeline_id, and cel_match expression."
        )
        print(f"Details: {e}")
    except core_exceptions.GoogleAPICallError as e:
        print(f"An API error occurred: {e.message}")
        print(f"Error code: {e.code}")
    except Exception as e:
        print(f"An unexpected error occurred: {e}")


# [END eventarc_v1_eventarc_enrollment_create]

if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Creates a new Eventarc enrollment.")
    parser.add_argument(
        "--project_id",
        type=str,
        required=True,
        help="The Google Cloud project ID.",
    )
    parser.add_argument(
        "--location",
        type=str,
        help="The Google Cloud region where the enrollment will be created (e.g., 'us-central1').",
    )
    parser.add_argument(
        "--enrollment_id",
        type=str,
        help="The user-provided ID for the new enrollment.",
    )
    parser.add_argument(
        "--message_bus_id",
        type=str,
        help="The ID of the message bus to subscribe to.",
    )
    parser.add_argument(
        "--destination_pipeline_id",
        type=str,
        help="The ID of the pipeline to which matched messages will be delivered.",
    )
    args = parser.parse_args()

    create_enrollment(
        project_id=args.project_id,
        location=args.location,
        enrollment_id=args.enrollment_id,
        message_bus_id=args.message_bus_id,
        destination_pipeline_id=args.destination_pipeline_id,
    )
