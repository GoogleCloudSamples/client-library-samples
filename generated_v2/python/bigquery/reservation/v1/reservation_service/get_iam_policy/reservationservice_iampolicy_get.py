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

# [START bigqueryreservation_v1_reservationservice_iampolicy_get]
from google.api_core import exceptions
from google.cloud import bigquery_reservation_v1


def get_iam_policy(project_id: str, location_id: str, reservation_id: str) -> None:
    """Gets the IAM policy for a BigQuery reservation.

    Args:
        project_id: The Google Cloud project ID hosting the target reservation.
        location_id: The BigQuery region or multi-region matching the reservation.
        reservation_id: The caller-defined identifier of the reservation.
    """
    client = bigquery_reservation_v1.ReservationServiceClient()

    resource = (
        f"projects/{project_id}/locations/{location_id}/reservations/{reservation_id}"
    )

    try:
        policy = client.get_iam_policy(request={"resource": resource})
        print(f"Retrieved IAM policy for resource: {resource}")
        print(f"Policy version: {policy.version}")
        for binding in policy.bindings:
            print(f"Role: {binding.role}")
            print(f"Members: {list(binding.members)}")
    except exceptions.GoogleAPICallError as exc:
        print(f"Failed to get IAM policy: {exc.message}")
# [END bigqueryreservation_v1_reservationservice_iampolicy_get]
