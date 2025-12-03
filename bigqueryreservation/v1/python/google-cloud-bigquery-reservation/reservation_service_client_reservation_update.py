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


# [START bigqueryreservation_v1_reservationservice_reservation_update]
from google.api_core import exceptions
from google.cloud import bigquery_reservation_v1
from google.protobuf import field_mask_pb2


def update_reservation(project_id: str, location: str, reservation_id: str):
    """Updates a reservation's slot capacity.

    A reservation must exist before it can be updated.

    Args:
        project_id: The Google Cloud project ID.
        location: The geographic location of the reservation, for example, us-central1.
        reservation_id: The ID of the reservation to update.
    """
    client = bigquery_reservation_v1.ReservationServiceClient()

    reservation = bigquery_reservation_v1.types.Reservation()
    reservation.name = client.reservation_path(project_id, location, reservation_id)
    reservation.slot_capacity = 200
    update_mask = field_mask_pb2.FieldMask(paths=["slot_capacity"])

    try:
        updated_reservation = client.update_reservation(
            reservation=reservation, update_mask=update_mask
        )
        print(f"Updated reservation: {updated_reservation.name}")
        print(f"New slot capacity: {updated_reservation.slot_capacity}")
    except exceptions.NotFound:
        print(f"Reservation '{reservation_id}' was not found in location '{location}'.")


# [END bigqueryreservation_v1_reservationservice_reservation_update]
