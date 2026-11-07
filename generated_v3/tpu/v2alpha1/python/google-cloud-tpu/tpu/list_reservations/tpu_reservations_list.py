# Copyright 2026 Google LLC
#
# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at
#
#     http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.

# [START tpu_v2alpha1_tpu_reservations_list]
from google.api_core import exceptions
from google.cloud import tpu_v2alpha1


def list_reservations(project_id: str, location_id: str) -> None:
    """Lists TPU reservations in a given project and location.

    Args:
        project_id: The Google Cloud project ID.
        location_id: The Google Cloud location (zone or region, for example, 'us-central1-a') for the reservations.
    """
    client = tpu_v2alpha1.TpuClient()
    parent = f"projects/{project_id}/locations/{location_id}"

    request = tpu_v2alpha1.ListReservationsRequest(
        parent=parent,
    )

    try:
        response = client.list_reservations(request=request)
        found = False
        for reservation in response:
            found = True
            print(f"Reservation name: {reservation.name}")
        if not found:
            print(f"No reservations found in {parent}.")
    except exceptions.GoogleAPICallError as error:
        print(f"Failed to list reservations: {error}")
# [END tpu_v2alpha1_tpu_reservations_list]
