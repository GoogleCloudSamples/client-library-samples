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

# [START bigqueryreservation_v1_reservationservice_allassignments_search]
from google.api_core import exceptions
from google.cloud import bigquery_reservation_v1


def search_all_assignments(project_id: str, location_id: str, query: str) -> None:
    """Searches BigQuery reservation assignments matching a query.

    Args:
        project_id: The Google Cloud project ID, or '-' to search across all projects.
        location_id: The BigQuery location (for example, 'US' or 'us-central1').
        query: The search query specifying the assignee resource (for example,
          'assignee=projects/example-project-id').
    """
    client = bigquery_reservation_v1.ReservationServiceClient()

    parent = f"projects/{project_id}/locations/{location_id}"

    request = bigquery_reservation_v1.SearchAllAssignmentsRequest(
        parent=parent,
        query=query,
    )

    try:
        response = client.search_all_assignments(request=request)
        assignments_found = False
        for assignment in response:
            assignments_found = True
            print(f"Assignment: {assignment.name}")
            print(f"  Assignee: {assignment.assignee}")
            print(f"  Job type: {assignment.job_type.name}")
            print(f"  State: {assignment.state.name}")

        if not assignments_found:
            print("No assignments found.")
    except exceptions.GoogleAPICallError as e:
        print(f"Failed to search assignments: {e}")
# [END bigqueryreservation_v1_reservationservice_allassignments_search]
