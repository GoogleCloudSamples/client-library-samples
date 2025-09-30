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

# [START bigqueryreservation_v1_reservationservice_get_reservation]
from google.api_core import exceptions
from google.cloud import bigquery_reservation_v1


def get_reservation(
    project_id: str,
    location: str,
    reservation_id: str,
) -> None:
    """
    Retrieves information about a BigQuery reservation.

    Args:
        project_id: The Google Cloud project ID.
        location: The location of the reservation (e.g., 'US', 'europe-west2').
        reservation_id: The ID of the reservation to retrieve.
    """
    client = bigquery_reservation_v1.ReservationServiceClient()

    reservation_name = client.reservation_path(project_id, location, reservation_id)

    try:
        request = bigquery_reservation_v1.GetReservationRequest(name=reservation_name)
        reservation = client.get_reservation(request=request)

        print(f"Successfully retrieved reservation: {reservation.name}")
        print(f"  Slot Capacity: {reservation.slot_capacity}")
        print(f"  Ignore Idle Slots: {reservation.ignore_idle_slots}")
        print(f"  Creation Time: {reservation.creation_time.isoformat()}")
        if reservation.autoscale and reservation.autoscale.max_slots > 0:
            print(f"  Autoscale Max Slots: {reservation.autoscale.max_slots}")
        print(f"  Edition: {reservation.edition.name}")

    except exceptions.NotFound:
        print(f"Error: Reservation '{reservation_name}' not found.")
        print(
            "Please ensure the project ID, location, and reservation ID are correct and the reservation exists."
        )
    except Exception as e:
        print(f"An unexpected error occurred: {e}")


# [END bigqueryreservation_v1_reservationservice_get_reservation]

if __name__ == "__main__":
    parser = argparse.ArgumentParser(
        description="Retrieve a BigQuery reservation's details."
    )
    parser.add_argument(
        "--project_id",
        type=str,
        required=True,
        help="Your Google Cloud project ID.",
    )
    parser.add_argument(
        "--location",
        type=str,
        required=True,
        help="The location of the reservation (e.g., 'US', 'europe-west2').",
    )
    parser.add_argument(
        "--reservation_id",
        type=str,
        required=True,
        help="The ID of the reservation to retrieve.",
    )
    args = parser.parse_args()

    get_reservation(args.project_id, args.location, args.reservation_id)
