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


# [START bigqueryreservation_v1_reservationservice_assignment_delete]
# [START bigqueryreservation_reservationservice_assignment_delete]
from google.api_core.exceptions import NotFound
from google.cloud import bigquery_reservation_v1


client = bigquery_reservation_v1.ReservationServiceClient()


def delete_assignment(
    project_id: str, location: str, reservation_id: str, assignment_id: str
):
    """Deletes a reservation assignment.

    This shows how to delete a reservation assignment. No expansion will happen.
    For example, if the organization has a reservation assignment and a
    project under the organization has a reservation assignment, deleting the
    organization's assignment will not affect the project's assignment.

    Args:
        project_id: The Google Cloud project ID.
        location: The geographic location of the reservation, such as 'us-west1'.
        reservation_id: The ID of the reservation which contains the assignment.
        assignment_id: The ID of the assignment to delete.
    """
    name = client.assignment_path(project_id, location, reservation_id, assignment_id)

    try:
        client.delete_assignment(name=name)
        print(f"Deleted assignment: {name}")
    except NotFound:
        print(f"Assignment '{name}' not found.")


# [END bigqueryreservation_reservationservice_assignment_delete]
# [END bigqueryreservation_v1_reservationservice_assignment_delete]
