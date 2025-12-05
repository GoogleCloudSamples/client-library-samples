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


# [START bigqueryreservation_v1_reservationservice_reservationgroup_get]
# [START bigqueryreservation_reservationservice_reservationgroup_get]
from google.api_core import exceptions
from google.cloud import bigquery_reservation_v1


client = bigquery_reservation_v1.ReservationServiceClient()


def get_reservation_group(project_id: str, location: str, reservation_group_id: str):
    """Gets information about a reservation group.

    A reservation group is a container for reservations.

    Args:
        project_id: The Google Cloud project ID.
        location: The geographic location of the reservation group, for example, us-central1.
        reservation_group_id: The ID of the reservation group to retrieve.
    """
    name = client.reservation_group_path(project_id, location, reservation_group_id)

    try:
        reservation_group = client.get_reservation_group(name=name)
        print(f"Retrieved reservation group: {reservation_group.name}")
    except exceptions.NotFound:
        print(f"Reservation group '{name}' not found.")


# [END bigqueryreservation_reservationservice_reservationgroup_get]
# [END bigqueryreservation_v1_reservationservice_reservationgroup_get]
