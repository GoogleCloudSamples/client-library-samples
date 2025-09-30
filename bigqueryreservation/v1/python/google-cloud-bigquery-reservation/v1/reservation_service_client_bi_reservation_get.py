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

# [START bigqueryreservation_v1_reservationservice_bireservation_get]
from google.api_core import exceptions as core_exceptions
from google.cloud import bigquery_reservation_v1


def get_bi_reservation(
    project_id: str,
    location: str,
) -> None:
    """Retrieves a BI reservation for a specific project and location.

    Args:
        project_id: The Google Cloud project ID.
        location: The geographic location of the BI reservation (e.g., "us-central1").
    """
    client = bigquery_reservation_v1.ReservationServiceClient()

    name = client.bi_reservation_path(project_id, location)

    try:
        bi_reservation = client.get_bi_reservation(name=name)

        print(f"Successfully retrieved BI Reservation: {bi_reservation.name}")
        print(f"  Size: {bi_reservation.size} bytes")
        if bi_reservation.update_time:
            print(f"  Last updated: {bi_reservation.update_time.isoformat()}")
        else:
            print("  Last updated: Not available")
        if bi_reservation.preferred_tables:
            print("  Preferred tables:")
            for table in bi_reservation.preferred_tables:
                print(f"    - {table.project_id}.{table.dataset_id}.{table.table_id}")
        else:
            print("  No preferred tables configured.")

    except core_exceptions.NotFound:
        print(f"Error: BI Reservation '{name}' not found.")
        print(
            "Please ensure the project and location are correct, and that a BI reservation exists."
        )
    except Exception as e:
        print(f"An unexpected error occurred: {e}")


# [END bigqueryreservation_v1_reservationservice_bireservation_get]


if __name__ == "__main__":
    parser = argparse.ArgumentParser(
        description="Retrieves a BI reservation for a specific project and location."
    )
    parser.add_argument(
        "--project_id",
        help="The Google Cloud project ID.",
        required=True,
        type=str,
    )
    parser.add_argument(
        "--location",
        help="The geographic location of the BI reservation (e.g., 'us-central1').",
        required=True,
        type=str,
    )
    args = parser.parse_args()

    get_bi_reservation(args.project_id, args.location)
