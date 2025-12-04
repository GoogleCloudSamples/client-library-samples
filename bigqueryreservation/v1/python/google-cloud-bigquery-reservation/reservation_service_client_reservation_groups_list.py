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


# [START bigqueryreservation_v1_reservationservice_reservationgroups_list]
import google.api_core.exceptions
from google.cloud import bigquery_reservation_v1

client = bigquery_reservation_v1.ReservationServiceClient()


def list_reservation_groups(project_id: str, location: str):
    """Lists all reservation groups for the project in the specified location.

    A reservation group is a container for reservations. This sample shows
    how to list all reservation groups within a specific project and location.

    Args:
        project_id: The Google Cloud project ID.
        location: The geographic location of the reservation groups, for example, "us-central1".
    """
    parent = f"projects/{project_id}/locations/{location}"

    try:
        page_result = client.list_reservation_groups(parent=parent)
        print(f"Listed reservation groups for parent: '{parent}'")
        for group in page_result:
            print(f"  Reservation group: {group.name}")
    except google.api_core.exceptions.NotFound:
        print(f"Parent resource '{parent}' was not found.")
    except google.api_core.exceptions.GoogleAPICallError as e:
        print(
            f"Could not list reservation groups. Please check your permissions. Error: {e}"
        )
    # [END bigqueryreservation_v1_reservationservice_reservationgroups_list]
