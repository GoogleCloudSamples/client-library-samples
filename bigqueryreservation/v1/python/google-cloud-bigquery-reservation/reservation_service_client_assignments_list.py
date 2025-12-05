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


# [START bigqueryreservation_v1_reservationservice_assignments_list]
# [START bigqueryreservation_reservationservice_assignments_list]
from google.api_core import exceptions
from google.cloud import bigquery_reservation_v1


def list_assignments(
    project_id: str,
    location: str,
    reservation_id: str,
):
    """Lists all assignments for a reservation.

    This sample shows how to list all assignments in a given reservation.
    To list all assignments in a given location, across all reservations,
    use a wildcard `-` for the reservation ID.

    Args:
        project_id: The Google Cloud project ID.
        location: The geographic location of the assignments , for example, 'us-central1'.
        reservation_id: The ID of the reservation to list assignments for, or "-"
            to list all assignments for the project and location.
    """
    client = bigquery_reservation_v1.ReservationServiceClient()
    parent = client.reservation_path(project_id, location, reservation_id)

    try:
        print(f"Listing assignments for parent: '{parent}'")
        assignment_list = client.list_assignments(parent=parent)

        found_assignments = False
        for assignment in assignment_list:
            found_assignments = True
            print(f"  Got assignment: {assignment.name}")

        if not found_assignments:
            print("No assignments found.")

    except exceptions.NotFound:
        print(f"Parent resource '{parent}' not found.")


# [END bigqueryreservation_reservationservice_assignments_list]
# [END bigqueryreservation_v1_reservationservice_assignments_list]
