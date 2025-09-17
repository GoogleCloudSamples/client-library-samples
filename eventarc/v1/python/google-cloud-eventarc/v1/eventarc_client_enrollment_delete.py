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

# [START eventarc_v1_eventarc_enrollment_delete]
from google.api_core import exceptions
from google.cloud import eventarc_v1


def delete_enrollment(
    project_id: str,
    location: str,
    enrollment_id: str,
) -> None:
    """
    Deletes an existing Eventarc enrollment.

    Args:
        project_id: The Google Cloud project ID.
        location: The region where the enrollment is located (e.g., "us-central1").
        enrollment_id: The ID of the enrollment to delete.
    """
    client = eventarc_v1.EventarcClient()

    enrollment_name = client.enrollment_path(project_id, location, enrollment_id)

    print(f"Attempting to delete enrollment: {enrollment_name}")

    try:
        operation = client.delete_enrollment(name=enrollment_name)
        operation.result()
        print(f"Enrollment {enrollment_name} deleted successfully.")
    except exceptions.NotFound:
        print(f"Error: Enrollment {enrollment_name} not found.")
        print("Please ensure the enrollment ID and location are correct.")
    except exceptions.GoogleAPICallError as e:
        print(f"Error deleting enrollment {enrollment_name}: {e}")
        print("Please check your project ID, permissions, and network connection.")


# [END eventarc_v1_eventarc_enrollment_delete]


if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Deletes an Eventarc enrollment.")
    parser.add_argument(
        "--project_id",
        help="The Google Cloud project ID.",
        required=True,
    )
    parser.add_argument(
        "--location",
        help="The region where the enrollment is located (e.g., 'us-central1').",
        required=True,
    )
    parser.add_argument(
        "--enrollment_id",
        help="The ID of the enrollment to delete.",
        required=True,
    )

    args = parser.parse_args()

    delete_enrollment(
        args.project_id,
        args.location,
        args.enrollment_id,
    )
