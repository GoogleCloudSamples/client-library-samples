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

import argparse

# [START bigqueryreservation_v1_reservationservice_assignment_create]
from google.api_core import exceptions
from google.cloud import bigquery_reservation_v1


def create_assignment(
    project_id: str,
    location: str,
    reservation_id: str,
    assignee_id: str,
) -> None:
    """
    Creates an assignment object which allows a project to submit jobs
    of a certain type using slots from the specified reservation.

    Args:
        project_id: The Google Cloud project ID.
        location: The location of the reservation (e.g., "us-central1").
        reservation_id: The ID of the reservation to assign.
        assignee_id: The ID of the project to assign to the reservation.
    """
    client = bigquery_reservation_v1.ReservationServiceClient()

    parent = client.reservation_path(project_id, location, reservation_id)

    assignee_resource = f"projects/{assignee_id}"

    assignment = bigquery_reservation_v1.types.Assignment(
        assignee=assignee_resource,
        job_type=bigquery_reservation_v1.types.Assignment.JobType.QUERY,
    )

    try:
        response = client.create_assignment(parent=parent, assignment=assignment)
        print(f"Assignment created successfully:")
        print(f"  Name: {response.name}")
        print(f"  Assignee: {response.assignee}")
        print(
            f"  Job Type: {bigquery_reservation_v1.types.Assignment.JobType(response.job_type).name}"
        )
        print(
            f"  State: {bigquery_reservation_v1.types.Assignment.State(response.state).name}"
        )
    except exceptions.AlreadyExists as e:
        print(
            f"Assignment for assignee '{assignee_resource}' to reservation '{reservation_id}' already exists."
        )
        print(f"Error details: {e}")
    except exceptions.NotFound as e:
        print(
            f"Error: The specified reservation '{reservation_id}' or project '{project_id}' or location '{location}' was not found."
        )
        print(
            f"Please ensure the reservation exists and the project/location are correct."
        )
        print(f"Error details: {e}")
    except Exception as e:
        print(f"An unexpected error occurred: {e}")


# [END bigqueryreservation_v1_reservationservice_assignment_create]

if __name__ == "__main__":
    parser = argparse.ArgumentParser(
        description="Creates a BigQuery Reservation assignment."
    )
    parser.add_argument(
        "--project_id",
        help="Your Google Cloud project ID.",
        required=True,
        type=str,
    )
    parser.add_argument(
        "--location",
        help="The location of the reservation (e.g., 'us-central1').",
        required=True,
        type=str,
    )
    parser.add_argument(
        "--reservation_id",
        help="The ID of the reservation to assign.",
        required=True,
        type=str,
    )
    parser.add_argument(
        "--assignee_id",
        help="The ID of the project to assign to the reservation (e.g., 'my-assigned-project').",
        required=True,
        type=str,
    )

    args = parser.parse_args()

    create_assignment(
        args.project_id,
        args.location,
        args.reservation_id,
        args.assignee_id,
    )
