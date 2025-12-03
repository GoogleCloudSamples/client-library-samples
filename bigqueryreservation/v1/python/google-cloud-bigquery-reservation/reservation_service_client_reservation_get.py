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


# [START bigqueryreservation_v1_reservationservice_reservation_get]
from google.api_core import exceptions
from google.cloud import bigquery_reservation_v1

client = bigquery_reservation_v1.ReservationServiceClient()


def get_reservation(project_id: str, location: str, reservation_id: str):
    """Gets information about a reservation.

    A reservation is a mechanism used to guarantee slots to users.

    Args:
        project_id: The Google Cloud project ID.
        location: The geographic location of the reservation, for example, "us-central1".
        reservation_id: The ID of the reservation to retrieve.
    """

    name = client.reservation_path(project_id, location, reservation_id)

    try:
        reservation = client.get_reservation(name=name)
        print(f"Retrieved reservation: {reservation.name}")
        print(f"\tSlot capacity: {reservation.slot_capacity}")
        print(f"\tIgnore idle slots: {reservation.ignore_idle_slots}")
    except exceptions.NotFound:
        print(f"Reservation '{reservation_id}' not found.")


# [END bigqueryreservation_v1_reservationservice_reservation_get]
