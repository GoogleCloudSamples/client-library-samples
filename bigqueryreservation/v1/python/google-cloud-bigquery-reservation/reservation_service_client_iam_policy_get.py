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


# [START bigqueryreservation_v1_reservationservice_iampolicy_get]
# [START bigqueryreservation_reservationservice_iampolicy_get]
from google.api_core.exceptions import NotFound
from google.cloud import bigquery_reservation_v1

client = bigquery_reservation_v1.ReservationServiceClient()


def get_reservation_iam_policy(project_id: str, location: str, reservation_id: str):
    """Gets the IAM policy for a reservation.

    An IAM policy is a collection of bindings that associates one or more
    principals with a single role. This sample demonstrates how to retrieve
    the policy for a reservation.

    Args:
        project_id: The Google Cloud project ID.
        location: The geographic location of the reservation, such as "us-central1".
        reservation_id: The ID of the reservation to get the policy for.
    """
    resource = client.reservation_path(project_id, location, reservation_id)

    try:
        policy = client.get_iam_policy(resource=resource)

        print(f"Got IAM policy for reservation: {resource}")
        for binding in policy.bindings:
            print(f"  Role: {binding.role}")
            print(f"  Members: {binding.members}")
    except NotFound:
        print(f"Reservation not found: {resource}")


# [END bigqueryreservation_reservationservice_iampolicy_get]
# [END bigqueryreservation_v1_reservationservice_iampolicy_get]
