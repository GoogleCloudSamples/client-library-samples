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

# [START bigqueryreservation_v1_reservationservice_list_assignments]
from google.api_core import exceptions
from google.cloud import bigquery_reservation_v1


def list_reservation_assignments(
    project_id: str, location: str, reservation_id: str
) -> None:
    """Lists assignments for a specific reservation.

    Args:
        project_id: The ID of the Google Cloud project.
        location: The location of the reservation (e.g., "us-central1").
        reservation_id: The ID of the reservation to list assignments for.
    """
    client = bigquery_reservation_v1.ReservationServiceClient()

    parent = client.reservation_path(project_id, location, reservation_id)

    print(f"Listing assignments for reservation: {parent}")

    try:
        assignments = client.list_assignments(parent=parent)

        found_assignments = False
        for assignment in assignments:
            found_assignments = True
            print(f"Assignment Name: {assignment.name}")
            print(f"  Assignee: {assignment.assignee}")
            print(f"  Job Type: {assignment.job_type.name}")
            print(f"  State: {assignment.state.name}")
            if assignment.enable_gemini_in_bigquery:
                print("  Gemini in BigQuery enabled: True")
            print("-------")

        if not found_assignments:
            print(f"No assignments found for reservation: {parent}")

    except exceptions.NotFound:
        print(
            f"Error: Reservation '{parent}' not found. "
            "Please ensure the reservation ID and location are correct."
        )
    except Exception as e:
        print(f"An unexpected error occurred: {e}")


# [END bigqueryreservation_v1_reservationservice_list_assignments]

if __name__ == "__main__":
    parser = argparse.ArgumentParser(
        description="Lists assignments for a BigQuery reservation."
    )
    parser.add_argument(
        "--project_id", required=True, type=str, help="The Google Cloud project ID."
    )
    parser.add_argument(
        "--location",
        required=True,
        type=str,
        help="The location of the reservation (e.g., 'us-central1').",
    )
    parser.add_argument(
        "--reservation_id",
        required=True,
        type=str,
        help="The ID of the reservation to list assignments for.",
    )
    args = parser.parse_args()
    list_reservation_assignments(args.project_id, args.location, args.reservation_id)
