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

# [START eventarc_v1_eventarc_enrollments_list]
from google.api_core import exceptions
from google.cloud import eventarc_v1


def list_enrollments(project_id: str, location: str) -> None:
    """Lists all enrollments in a given project and location.

    Args:
        project_id: The Google Cloud project ID.
        location: The Google Cloud region where the enrollments are located
                  (e.g., "us-central1").
    """
    client = eventarc_v1.EventarcClient()

    parent = f"projects/{project_id}/locations/{location}"

    request = eventarc_v1.ListEnrollmentsRequest(
        parent=parent,
    )

    try:
        page_result = client.list_enrollments(request=request)

        found_enrollments = False
        for enrollment in page_result:
            found_enrollments = True
            print(f"  Enrollment Name: {enrollment.name}")
            print(f"  Message Bus: {enrollment.message_bus}")
            print(f"  Destination: {enrollment.destination}")
            print(f"  CEL Match: {enrollment.cel_match}")
            print(f"  Create Time: {enrollment.create_time}")
            print(f"  Update Time: {enrollment.update_time}")
            print("---")

        if not found_enrollments:
            print("No enrollments found.")

    except exceptions.NotFound as e:
        print(
            f"Error: The specified project or location was not found: {e}. "
            "Please ensure the project ID and location are correct and that "
            "the Eventarc API is enabled for the project."
        )
    except exceptions.GoogleAPICallError as e:
        print(f"An API error occurred: {e}")
        print("Please check your project ID, location, and permissions.")


# [END eventarc_v1_eventarc_enrollments_list]

if __name__ == "__main__":
    parser = argparse.ArgumentParser(
        description="Lists all Eventarc enrollments in a given project and location."
    )
    parser.add_argument(
        "--project_id", required=True, help="The Google Cloud project ID."
    )
    parser.add_argument(
        "--location",
        required=True,
        help="The Google Cloud region where the enrollments are located (e.g., 'us-central1').",
    )
    args = parser.parse_args()
    list_enrollments(args.project_id, args.location)
