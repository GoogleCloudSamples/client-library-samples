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


# [START bigqueryreservation_v1_reservationservice_reservations_list]
# [START bigqueryreservation_reservationservice_reservations_list]
from google.api_core import exceptions
from google.cloud import bigquery_reservation_v1

client = bigquery_reservation_v1.ReservationServiceClient()


def list_reservations(project_id: str, location: str):
    """Lists all reservations for a project and location.

    A reservation provides computational resource guarantees, in the form of
    slots, to users. This sample shows how to list existing reservations
    within a specific project and location.

    Args:
        project_id: The Google Cloud project ID.
        location: The geographic location of the reservations, for example, us-central1.
    """

    parent = f"projects/{project_id}/locations/{location}"

    try:
        print(f"Listing reservations for parent: '{parent}':")
        for reservation in client.list_reservations(parent=parent):
            print(f"\tReservation: {reservation.name}")
            print(f"\tSlot capacity: {reservation.slot_capacity}")

        print("Finished listing reservations.")
    except exceptions.NotFound:
        print(
            f"Parent resource '{parent}' was not found. Please check your project ID and location."
        )


# [END bigqueryreservation_reservationservice_reservations_list]
# [END bigqueryreservation_v1_reservationservice_reservations_list]
