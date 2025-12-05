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


# [START bigqueryreservation_v1_reservationservice_assignment_create]
# [START bigqueryreservation_reservationservice_assignment_create]
from google.api_core import exceptions
from google.cloud import bigquery_reservation_v1

client = bigquery_reservation_v1.ReservationServiceClient()


def create_assignment(project_id: str, location: str, reservation_id: str):
    """Creates a new assignment for a reservation.

    This shows how to create an assignment that gives a project access to
    a reservation.

    Args:
        project_id: The Google Cloud project ID of the reservation owner.
        location: The geographic location of the reservation, for example, "US".
        reservation_id: The ID of the reservation to create the assignment in.
    """

    parent = client.reservation_path(project_id, location, reservation_id)
    assignee = f"projects/{project_id}"
    assignment = bigquery_reservation_v1.Assignment(
        assignee=assignee,
        job_type=bigquery_reservation_v1.Assignment.JobType.QUERY,
    )

    try:
        created_assignment = client.create_assignment(
            parent=parent, assignment=assignment
        )
        print(f"Created assignment: {created_assignment.name}")
    except exceptions.AlreadyExists:
        print(f"Assignment for project {project_id} and job type QUERY already exists.")


# [END bigqueryreservation_reservationservice_assignment_create]
# [END bigqueryreservation_v1_reservationservice_assignment_create]
