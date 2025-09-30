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

# [START bigqueryreservation_v1_reservationservice_update_bi_reservation]
from google.api_core import exceptions
from google.cloud import bigquery_reservation_v1
from google.protobuf import field_mask_pb2


def update_bi_reservation(
    project_id: str,
    location: str,
    new_size: int,
) -> None:
    """
    Updates a BI reservation's allocated slot size.

    Args:
        project_id: The ID of the Google Cloud project.
        location: The geographic location of the BI reservation (e.g., "US").
        new_size: The new size (number of slots) to allocate to the BI reservation.
                  Set to 0 to release BI capacity. e.g. 1073741824 (for 1G)
    """
    client = bigquery_reservation_v1.ReservationServiceClient()

    bi_reservation_name = client.bi_reservation_path(project_id, location)

    bi_reservation = bigquery_reservation_v1.types.BiReservation(
        name=bi_reservation_name,
        size=new_size,
    )

    # Specify which fields to update using a FieldMask
    update_mask = field_mask_pb2.FieldMask(paths=["size"])

    request = bigquery_reservation_v1.types.UpdateBiReservationRequest(
        bi_reservation=bi_reservation,
        update_mask=update_mask,
    )

    try:
        response = client.update_bi_reservation(request=request)

        print(f"Successfully updated BI reservation: {response.name}")
        print(f"New size: {response.size}")
        print(f"Last update time: {response.update_time}")

    except exceptions.NotFound:
        print(
            f"Error: BI reservation '{bi_reservation_name}' not found. "
            "Please ensure the project ID and location are correct and that "
            "a BI reservation exists for this location."
        )
    except exceptions.GoogleAPIError as e:
        print(f"An API error occurred: {e}")
    except Exception as e:
        print(f"An unexpected error occurred: {e}")


# [END bigqueryreservation_v1_reservationservice_update_bi_reservation]

if __name__ == "__main__":
    parser = argparse.ArgumentParser(
        description="Update a BigQuery BI reservation's slot size."
    )
    parser.add_argument(
        "--project_id",
        required=True,
        type=str,
        help="The Google Cloud project ID.",
    )
    parser.add_argument(
        "--location",
        required=True,
        type=str,
        help="The geographic location of the BI reservation (e.g., 'US').",
    )
    parser.add_argument(
        "--new_size",
        default=1073741824, # 1 GB in bytes
        type=str,
        help="The new size (number of slots) to allocate to the BI reservation. Set to 0 to release BI capacity.",
    )

    args = parser.parse_args()

    update_bi_reservation(args.project_id, args.location, args.new_size)
