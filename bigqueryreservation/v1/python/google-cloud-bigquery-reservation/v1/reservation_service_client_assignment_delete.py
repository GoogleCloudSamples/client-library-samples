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

from google.api_core import exceptions

# [START bigqueryreservation_v1_reservationservice_assignment_delete]
from google.cloud import bigquery_reservation_v1


def delete_assignment(
    project_id: str,
    location: str,
    reservation_id: str,
    assignment_id: str,
) -> None:
    """
    Deletes a BigQuery Reservation assignment.

    Args:
        project_id: The ID of the Google Cloud project.
        location: The geographic location of the reservation (e.g., "US").
        reservation_id: The ID of the reservation containing the assignment.
        assignment_id: The ID of the assignment to delete.
                       This is the numeric ID returned when the assignment was created.
    """
    client = bigquery_reservation_v1.ReservationServiceClient()

    assignment_name = client.assignment_path(
        project=project_id,
        location=location,
        reservation=reservation_id,
        assignment=assignment_id,
    )

    try:
        client.delete_assignment(name=assignment_name)
        print(f"Assignment '{assignment_name}' deleted successfully.")
    except exceptions.NotFound:
        print(
            f"Assignment '{assignment_name}' not found. It may have already been deleted."
        )
    except Exception as e:
        print(f"Error deleting assignment '{assignment_name}': {e}")


# [END bigqueryreservation_v1_reservationservice_assignment_delete]


if __name__ == "__main__":
    parser = argparse.ArgumentParser(
        description="Deletes a BigQuery Reservation assignment."
    )
    parser.add_argument(
        "--project_id",
        required=True,
        type=str,
        help="The ID of the Google Cloud project.",
    )
    parser.add_argument(
        "--location",
        required=True,
        type=str,
        help="The location of the reservation (e.g., 'us-central1').",
    )
    parser.add_argument(
        "--reservation_id",
        required=True,
        type=str,
        help="The ID of the reservation containing the assignment.",
    )
    parser.add_argument(
        "--assignment_id",
        required=True,
        type=str,
        help="The ID of the assignment to delete.",
    )
    args = parser.parse_args()

    delete_assignment(
        args.project_id,
        args.location,
        args.reservation_id,
        args.assignment_id,
    )
