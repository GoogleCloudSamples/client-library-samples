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

# [START bigqueryreservation_v1_reservationservice_reservationgroups_list]
import google.api_core.exceptions
from google.cloud import bigquery_reservation_v1


def list_reservation_groups(project_id: str, location_id: str) -> None:
    """Lists BigQuery reservation groups in a specified location.

    Args:
        project_id: The Google Cloud project ID containing the reservation
          groups.
        location_id: The geographic location (region or multi-region) where the
          reservation groups reside, for example, 'US' or 'us-central1'.
    """
    parent = f"projects/{project_id}/locations/{location_id}"

    client = bigquery_reservation_v1.ReservationServiceClient()
    request = bigquery_reservation_v1.ListReservationGroupsRequest(
        parent=parent,
    )

    try:
        page_result = client.list_reservation_groups(request=request)
        found = False
        for reservation_group in page_result:
            print(f"Reservation group name: {reservation_group.name}")
            found = True

        if not found:
            print(f"No reservation groups found in {parent}.")
    except google.api_core.exceptions.GoogleAPICallError as error:
        print(f"Request failed: {error}")
# [END bigqueryreservation_v1_reservationservice_reservationgroups_list]
