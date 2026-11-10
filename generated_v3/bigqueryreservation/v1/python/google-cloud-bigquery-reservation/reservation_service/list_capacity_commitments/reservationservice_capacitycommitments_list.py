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

# [START bigqueryreservation_v1_reservationservice_capacitycommitments_list]
import google.api_core.exceptions
from google.cloud import bigquery_reservation_v1


def list_capacity_commitments(project_id: str, location_id: str) -> None:
    """Lists BigQuery capacity commitments in a given project and location.

    Args:
        project_id: The Google Cloud project ID.
        location_id: The BigQuery location (for example, 'US', 'EU', or 'us-central1').
    """
    client = bigquery_reservation_v1.ReservationServiceClient()

    parent = f"projects/{project_id}/locations/{location_id}"

    request = bigquery_reservation_v1.ListCapacityCommitmentsRequest(
        parent=parent,
    )

    try:
        page_result = client.list_capacity_commitments(request=request)
        found = False
        for commitment in page_result:
            found = True
            print(f"Capacity commitment: {commitment.name}")
            print(f"Slot count: {commitment.slot_count}")
            print(f"Plan: {commitment.plan.name}")
            print(f"State: {commitment.state.name}")
        if not found:
            print(f"No capacity commitments found in {parent}.")
    except google.api_core.exceptions.GoogleAPICallError as e:
        print(f"Failed to list capacity commitments: {e}")
# [END bigqueryreservation_v1_reservationservice_capacitycommitments_list]
