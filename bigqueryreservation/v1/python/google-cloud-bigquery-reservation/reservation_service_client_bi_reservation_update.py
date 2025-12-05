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


# [START bigqueryreservation_v1_reservationservice_bireservation_update]
# [START bigqueryreservation_reservationservice_bireservation_update]
from google.api_core import exceptions
from google.cloud import bigquery_reservation_v1
from google.protobuf import field_mask_pb2

client = bigquery_reservation_v1.ReservationServiceClient()


def update_bi_reservation(project_id: str, location: str):
    """Updates a BI reservation.

    A singleton BI reservation always exists with default size 0.
    To reserve BI capacity, update the reservation to an amount
    greater than 0. To release BI capacity, set the reservation size to 0.

    Args:
        project_id: The Google Cloud project ID.
        location: The geographic location of the BI reservation, for example, us-central1.
    """

    name = client.bi_reservation_path(project=project_id, location=location)
    bi_reservation = bigquery_reservation_v1.types.BiReservation()
    bi_reservation.name = name

    # The size of a BI reservation is measured in bytes. 2 GB is used here.
    bi_reservation.size = 2 * 10**9
    update_mask = field_mask_pb2.FieldMask(paths=["size"])

    try:
        response = client.update_bi_reservation(
            bi_reservation=bi_reservation, update_mask=update_mask
        )
        print(f"Updated BI reservation: {response.name}")
        print(f"New size is {response.size} bytes.")
    except exceptions.NotFound:
        print(
            f"BI reservation not found for project '{project_id}' in location '{location}'."
        )


# [END bigqueryreservation_reservationservice_bireservation_update]
# [END bigqueryreservation_v1_reservationservice_bireservation_update]
