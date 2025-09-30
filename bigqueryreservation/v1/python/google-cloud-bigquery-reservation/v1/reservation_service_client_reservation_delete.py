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

# [START bigqueryreservation_v1_reservationservice_reservation_delete]
from google.api_core import exceptions
from google.cloud import bigquery_reservation_v1


def delete_reservation(
    project_id: str,
    location: str,
    reservation_id: str,
) -> None:
    """
    Deletes a BigQuery reservation.

    Args:
        project_id: The ID of the Google Cloud project.
        location: The location of the reservation (e.g., "us-central1").
        reservation_id: The ID of the reservation to delete.
    """
    client = bigquery_reservation_v1.ReservationServiceClient()

    reservation_name = client.reservation_path(project_id, location, reservation_id)

    try:
        client.delete_reservation(name=reservation_name)
        print(f"Reservation {reservation_name} deleted successfully.")
    except exceptions.NotFound:
        print(
            f"Reservation {reservation_name} not found. It may have already been deleted."
        )
    except exceptions.FailedPrecondition as e:
        print(
            f"Failed to delete reservation {reservation_name} due to a precondition error: {e}. "
            "This usually means the reservation still has assignments. "
            "Please delete all assignments before deleting the reservation."
        )
    except Exception as e:
        print(f"An unexpected error occurred: {e}")


# [END bigqueryreservation_v1_reservationservice_reservation_delete]

if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Deletes a BigQuery reservation.")
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
        help=("The ID of the reservation to delete."),
    )
    args = parser.parse_args()

    delete_reservation(args.project_id, args.location, args.reservation_id)
