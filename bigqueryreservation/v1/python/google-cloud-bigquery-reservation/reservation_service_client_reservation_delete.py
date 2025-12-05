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


# [START bigqueryreservation_v1_reservationservice_reservation_delete]
# [START bigqueryreservation_reservationservice_reservation_delete]
from google.api_core.exceptions import NotFound
from google.cloud import bigquery_reservation_v1

client = bigquery_reservation_v1.ReservationServiceClient()


def delete_reservation(project_id: str, location: str, reservation_id: str):
    """Deletes a reservation.

    A reservation can only be deleted if it has no assignments.

    Args:
        project_id: The Google Cloud project ID.
        location: The geographic location of the reservation, for example, "us-central1".
        reservation_id: The ID of the reservation to delete.
    """
    name = client.reservation_path(project_id, location, reservation_id)

    try:
        client.delete_reservation(name=name)
        print(f"Deleted reservation: {name}")
    except NotFound:
        print(f"Reservation '{name}' not found.")


# [END bigqueryreservation_reservationservice_reservation_delete]
# [END bigqueryreservation_v1_reservationservice_reservation_delete]
