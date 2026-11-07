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

# [START bigqueryreservation_v1_reservationservice_reservation_get]
import google.api_core.exceptions
from google.cloud import bigquery_reservation_v1


def get_reservation(project_id: str, location_id: str, reservation_id: str) -> None:
    """Retrieves an existing BigQuery reservation.

    Args:
        project_id: The Google Cloud project ID that owns the reservation.
        location_id: The Google Cloud region or multi-region of the reservation
          (for example, 'US', 'EU', 'us-central1').
        reservation_id: The identifier of the reservation to retrieve.
    """
    client = bigquery_reservation_v1.ReservationServiceClient()

    name = f"projects/{project_id}/locations/{location_id}/reservations/{reservation_id}"

    try:
        response = client.get_reservation(name=name)
        print(f"Retrieved reservation: {response.name}")
        print(f"Slot capacity: {response.slot_capacity}")
    except google.api_core.exceptions.GoogleAPICallError as error:
        print(f"API request failed: {error}")
# [END bigqueryreservation_v1_reservationservice_reservation_get]
