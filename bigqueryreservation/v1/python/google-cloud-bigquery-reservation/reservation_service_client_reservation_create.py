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

# [START bigqueryreservation_v1_reservationservice_reservation_create]
from google.api_core.exceptions import AlreadyExists
from google.cloud import bigquery_reservation_v1

client = bigquery_reservation_v1.ReservationServiceClient()


def create_reservation(project_id: str, location: str, reservation_id: str):
    """Creates a reservation.

    A reservation is a mechanism used to guarantee slots to users.

    Args:
        project_id: The Google Cloud project ID.
        location: The geographic location of the reservation, for example, "us-central1".
        reservation_id: The ID of the reservation to create. It must only contain
            lower case alphanumeric characters or dashes. It must start with a
            letter and must not end with a dash. Its maximum length is 64
            characters.
    """

    parent = f"projects/{project_id}/locations/{location}"
    reservation = bigquery_reservation_v1.Reservation(
        slot_capacity=100,
        ignore_idle_slots=True,
    )

    try:
        response = client.create_reservation(
            parent=parent,
            reservation_id=reservation_id,
            reservation=reservation,
        )
        print(f"Created reservation: {response.name}")
    except AlreadyExists:
        print(
            f"Reservation '{reservation_id}' already exists in location '{location}'."
        )


# [END bigqueryreservation_v1_reservationservice_reservation_create]
