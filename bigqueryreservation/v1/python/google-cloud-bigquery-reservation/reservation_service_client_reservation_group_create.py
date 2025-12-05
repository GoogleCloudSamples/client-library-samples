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


# [START bigqueryreservation_v1_reservationservice_reservationgroup_create]
# [START bigqueryreservation_reservationservice_reservationgroup_create]
from google.api_core import exceptions
from google.cloud import bigquery_reservation_v1


client = bigquery_reservation_v1.ReservationServiceClient()


def create_reservation_group(project_id: str, location: str, reservation_group_id: str):
    """Creates a reservation group.

    A reservation group is a container for reservations.

    Args:
        project_id: The Google Cloud project ID.
        location: The geographic location where the reservation group should be created.
        reservation_group_id: The ID of the reservation group to create.
            It must only contain lower case alphanumeric characters or dashes.
            It must start with a letter and must not end with a dash.
            Its maximum length is 64 characters.
    """
    parent = f"projects/{project_id}/locations/{location}"
    reservation_group = bigquery_reservation_v1.types.ReservationGroup()

    request = bigquery_reservation_v1.CreateReservationGroupRequest(
        parent=parent,
        reservation_group_id=reservation_group_id,
        reservation_group=reservation_group,
    )

    try:
        response = client.create_reservation_group(request=request)
        print(f"Created reservation group: {response.name}")
    except exceptions.AlreadyExists:
        full_reservation_group_name = client.reservation_group_path(
            project_id, location, reservation_group_id
        )
        print(f"Reservation group '{full_reservation_group_name}' already exists.")


# [END bigqueryreservation_reservationservice_reservationgroup_create]
# [END bigqueryreservation_v1_reservationservice_reservationgroup_create]
