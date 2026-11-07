# Copyright 2026 Google LLC
#
# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at
#
#     http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.

# [START bigqueryreservation_v1_reservationservice_reservation_create]
import google.api_core.exceptions
from google.cloud import bigquery_reservation_v1


def create_reservation(
    project_id: str, location_id: str, reservation_id: str
) -> None:
    """Creates a BigQuery reservation.

    Args:
        project_id: The Google Cloud project ID hosting the reservation.
        location_id: The BigQuery location or region, for example, 'US', 'EU',
            or 'us-central1'.
        reservation_id: Caller-chosen ID for the new reservation.
    """
    client = bigquery_reservation_v1.ReservationServiceClient()

    parent = f"projects/{project_id}/locations/{location_id}"
    reservation = bigquery_reservation_v1.Reservation(
        slot_capacity=100,
        edition=bigquery_reservation_v1.Edition.ENTERPRISE,
        ignore_idle_slots=False,
    )

    try:
        response = client.create_reservation(
            parent=parent,
            reservation=reservation,
            reservation_id=reservation_id,
        )
        print(f"Created reservation: {response.name}")
        print(f"Slot capacity: {response.slot_capacity}")
    except google.api_core.exceptions.GoogleAPICallError as error:
        print(f"Failed to create reservation: {error}")
# [END bigqueryreservation_v1_reservationservice_reservation_create]
