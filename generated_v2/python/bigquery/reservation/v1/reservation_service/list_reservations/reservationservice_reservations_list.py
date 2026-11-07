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

# [START bigqueryreservation_v1_reservationservice_reservations_list]
import google.api_core.exceptions
from google.cloud import bigquery_reservation_v1


def list_reservations(project_id: str, location_id: str) -> None:
    """List BigQuery reservations in a given project and location.

    Args:
        project_id: The Google Cloud project ID hosting the BigQuery reservations.
        location_id: The geographic location or region (for example, 'US' or 'us-central1').
    """
    client = bigquery_reservation_v1.ReservationServiceClient()
    parent = f"projects/{project_id}/locations/{location_id}"

    request = bigquery_reservation_v1.ListReservationsRequest(parent=parent)

    try:
        page_result = client.list_reservations(request=request)
        for reservation in page_result:
            print(f"Reservation name: {reservation.name}")
            print(f"Slot capacity: {reservation.slot_capacity}")
            print(f"Edition: {reservation.edition.name}")
    except google.api_core.exceptions.GoogleAPICallError as e:
        print(f"Request failed: {e.message}")
# [END bigqueryreservation_v1_reservationservice_reservations_list]
