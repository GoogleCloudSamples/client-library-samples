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

# [START bigqueryreservation_v1_reservationservice_bireservation_get]
from google.api_core.exceptions import NotFound
from google.cloud import bigquery_reservation_v1


def get_bi_reservation(project_id: str, location: str):
    """Gets a BI reservation.

    A BI reservation is a singleton resource. It is not created explicitly, but
    can be updated to enable BI Engine.

    Args:
        project_id: The Google Cloud project ID.
        location: The geographic location of the BI reservation , for example, us-central1.
    """
    client = bigquery_reservation_v1.ReservationServiceClient()
    name = client.bi_reservation_path(project_id, location)

    try:
        reservation = client.get_bi_reservation(name=name)
        print(f"Got BI reservation: {reservation.name}")
        print(f"\tSize: {reservation.size} bytes")
        print(f"\tUpdated at: {reservation.update_time}")
    except NotFound:
        print(
            f"BI reservation not found for project '{project_id}' in location '{location}'."
        )


# [END bigqueryreservation_v1_reservationservice_bireservation_get]
