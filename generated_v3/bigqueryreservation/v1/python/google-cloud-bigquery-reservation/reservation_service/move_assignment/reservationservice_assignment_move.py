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

# [START bigqueryreservation_v1_reservationservice_move_assignment]
from google.api_core import exceptions
from google.cloud import bigquery_reservation_v1


def move_assignment(
    project_id: str,
    location_id: str,
    reservation_id: str,
    assignment_id: str,
    destination_reservation_id: str,
) -> None:
    """Moves an assignment from a source reservation to a destination reservation.

    Args:
        project_id: The Google Cloud project ID.
        location_id: The BigQuery location of the reservation (for example, 'US', 'EU', or 'us-central1').
        reservation_id: The ID of the source BigQuery reservation currently holding the assignment.
        assignment_id: The ID of the assignment to move.
        destination_reservation_id: The ID of the destination BigQuery reservation.
    """
    client = bigquery_reservation_v1.ReservationServiceClient()

    name = (
        f"projects/{project_id}/locations/{location_id}/"
        f"reservations/{reservation_id}/assignments/{assignment_id}"
    )
    destination_id = (
        f"projects/{project_id}/locations/{location_id}/"
        f"reservations/{destination_reservation_id}"
    )

    request = bigquery_reservation_v1.MoveAssignmentRequest(
        name=name,
        destination_id=destination_id,
    )

    try:
        response = client.move_assignment(request=request)
        print(f"Moved assignment resource name: {response.name}")
        print(f"Assignee: {response.assignee}")
        print(f"Job type: {response.job_type.name}")
        print(f"State: {response.state.name}")
    except exceptions.GoogleAPICallError as e:
        print(f"Failed to move assignment: {e}")
# [END bigqueryreservation_v1_reservationservice_move_assignment]
