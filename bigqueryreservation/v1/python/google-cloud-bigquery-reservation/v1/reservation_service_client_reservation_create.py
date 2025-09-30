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

# [START bigqueryreservation_v1_reservationservice_reservation_create]
from google.api_core import exceptions
from google.cloud import bigquery_reservation_v1


def create_reservation(
    project_id: str,
    location: str,
    reservation_id: str,
    slot_capacity: int,
) -> None:
    """
    Creates a new BigQuery reservation resource.
    Args:
        project_id: The Google Cloud project ID.
        location: The geographic location (e.g., "us-central1").
        reservation_id: The ID of the reservation to create.
        slot_capacity: The number of slots to allocate to this reservation.
    """
    client = bigquery_reservation_v1.ReservationServiceClient()

    parent_path = f"projects/{project_id}/locations/{location}"

    reservation = bigquery_reservation_v1.Reservation(slot_capacity=slot_capacity)

    try:
        response = client.create_reservation(
            parent=parent_path,
            reservation=reservation,
            reservation_id=reservation_id,
        )

        print(f"Successfully created reservation: {response.name}")
        print(f"  Slot capacity: {response.slot_capacity}")
        print(f"  Creation time: {response.creation_time.isoformat()}")

    except exceptions.AlreadyExists as e:
        print(f"Reservation '{reservation_id}' already exists in {parent_path}.")
        print(f"Please choose a unique reservation ID or delete the existing one.")
        print(f"Error details: {e}")
    except exceptions.GoogleAPIError as e:
        print(f"A Google API error occurred: {e}")
        print(f"Please check your project ID, location, and permissions.")
    except Exception as e:
        # Catch any other unexpected errors.
        print(f"An unexpected error occurred: {e}")


# [END bigqueryreservation_v1_reservationservice_reservation_create]

if __name__ == "__main__":
    parser = argparse.ArgumentParser(
        description="Creates a new BigQuery reservation resource."
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
        help="The geographic location (e.g., 'us-central1').",
    )
    parser.add_argument(
        "--reservation_id",
        type=str,
        required=True,
        help="The ID of the reservation to create. Must be unique within the location.",
    )
    parser.add_argument(
        "--slot_capacity",
        type=int,
        default=100,
        help="The number of slots to allocate to this reservation.",
    )

    args = parser.parse_args()

    create_reservation(
        args.project_id,
        args.location,
        args.reservation_id,
        args.slot_capacity,
    )
