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

from google.api_core import exceptions as google_exceptions

# [START bigqueryreservation_v1_reservationservice_list_reservations]
from google.cloud import bigquery_reservation_v1


def list_reservations(project_id: str, location: str) -> None:
    """Lists all BigQuery reservations for a given project and location.

    Args:
        project_id: The Google Cloud project ID.
        location: The geographic location of the reservations (e.g., "us-central1").
                  This should be a valid Google Cloud region where reservations are managed.
    """
    parent = f"projects/{project_id}/locations/{location}"

    client = bigquery_reservation_v1.ReservationServiceClient()
    try:
        page_result = client.list_reservations(parent=parent)

        reservations_found = False
        for reservation in page_result:
            reservations_found = True
            print(f"\nReservation found: {reservation.name}")
            print(f"  Slot capacity: {reservation.slot_capacity}")
            print(f"  Ignore idle slots: {reservation.ignore_idle_slots}")
            if reservation.autoscale and reservation.autoscale.max_slots > 0:
                print(f"  Autoscale max slots: {reservation.autoscale.max_slots}")
            if reservation.creation_time:
                print(f"  Creation time: {reservation.creation_time.isoformat()}")
            if reservation.update_time:
                print(f"  Update time: {reservation.update_time.isoformat()}")
            if reservation.edition:
                print(f"  Edition: {reservation.edition.name}")
            if reservation.primary_location:
                print(f"  Primary location: {reservation.primary_location}")
            if reservation.secondary_location:
                print(f"  Secondary location: {reservation.secondary_location}")
            if reservation.max_slots > 0:
                print(f"  Max slots: {reservation.max_slots}")
            if reservation.scaling_mode:
                print(f"  Scaling mode: {reservation.scaling_mode.name}")
            print("------")

        if not reservations_found:
            print(
                f"No reservations found for project '{project_id}' in location '{location}'."
            )

    except google_exceptions.InvalidArgument as e:
        print(f"Error listing reservations: Invalid argument provided. Details: {e}")
        print(
            f"Please check that the project ID '{project_id}' and location '{location}' are correct."
        )
    except google_exceptions.PermissionDenied as e:
        print(f"Error listing reservations: Permission denied. Details: {e}")
        print(
            f"Ensure the service account has 'bigquery.reservations.list' permission for '{parent}'."
        )
    except google_exceptions.NotFound as e:
        print(f"Error listing reservations: Resource not found. Details: {e}")
        print(
            f"Verify that project '{project_id}' and location '{location}' exist and are accessible."
        )
    except Exception as e:
        print(f"An unexpected error occurred: {e}")


# [END bigqueryreservation_v1_reservationservice_list_reservations]


if __name__ == "__main__":
    parser = argparse.ArgumentParser(
        description="Lists all BigQuery reservations for a given project and location."
    )
    parser.add_argument(
        "--project_id",
        required=True,
        type=str,
        help="The Google Cloud project ID.",
    )
    parser.add_argument(
        "--location",
        required=True,
        type=str,
        help="The geographic location of the reservations (e.g., 'us-central1').",
    )
    args = parser.parse_args()
    list_reservations(args.project_id, args.location)
