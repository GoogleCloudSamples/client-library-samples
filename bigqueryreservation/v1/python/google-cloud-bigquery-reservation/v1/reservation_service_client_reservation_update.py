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

# [START bigqueryreservation_v1_reservationservice_reservation_update]
from google.api_core import exceptions
from google.cloud import bigquery_reservation_v1
from google.protobuf import field_mask_pb2


def update_bigquery_reservation(
    project_id: str,
    location: str,
    reservation_id: str,
    new_slot_capacity: int,
) -> None:
    """
    Updates the slot capacity of an existing BigQuery reservation.

    Args:
        project_id: The Google Cloud project ID.
        location: The geographic location of the reservation (e.g., 'US', 'EU').
        reservation_id: The ID of the reservation to update.
        new_slot_capacity: The new number of slots to set for the reservation.
    """
    client = bigquery_reservation_v1.ReservationServiceClient()

    reservation_name = client.reservation_path(project_id, location, reservation_id)

    updated_reservation = bigquery_reservation_v1.Reservation(
        name=reservation_name,
        slot_capacity=new_slot_capacity,
    )

    # Create a FieldMask to specify that only the 'slot_capacity' field should be updated.
    # This ensures that other fields of the reservation are not inadvertently changed.
    update_mask = field_mask_pb2.FieldMask(paths=["slot_capacity"])

    try:
        response = client.update_reservation(
            reservation=updated_reservation, update_mask=update_mask
        )

        print("Successfully updated reservation:")
        print(f"Reservation Name: {response.name}")
        print(f"New Slot Capacity: {response.slot_capacity}")
        print(f"Ignore Idle Slots: {response.ignore_idle_slots}")

    except exceptions.NotFound:
        print(f"Error: Reservation '{reservation_name}' not found.")
        print("Please ensure the project ID, location, and reservation ID are correct.")
    except Exception as e:
        print(f"An unexpected error occurred: {e}")


# [END bigqueryreservation_v1_reservationservice_reservation_update]

if __name__ == "__main__":
    parser = argparse.ArgumentParser(
        description="Updates the slot capacity of a BigQuery reservation."
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
        help="The geographic location of the reservation.",
    )
    parser.add_argument(
        "--reservation_id",
        type=str,
        required=True,
        help="The ID of the reservation to update.",
    )
    parser.add_argument(
        "--new_slot_capacity",
        type=int,
        default=50,
        help="The new number of slots for the reservation.",
    )

    args = parser.parse_args()

    update_bigquery_reservation(
        args.project_id,
        args.location,
        args.reservation_id,
        args.new_slot_capacity,
    )
