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

# [START contact_center_insights_query_metrics]
import google.api_core.exceptions
from google.cloud import contact_center_insights_v1


def query_metrics(project_id: str, location_id: str) -> None:
    """Queries Contact Center Insights metrics within a specified time window.

    Args:
        project_id: The Google Cloud project ID (for example,
          'example-project-id').
        location_id: The Google Cloud region where the service is located (for
          example, 'us-central1').
    """
    client = contact_center_insights_v1.ContactCenterInsightsClient()

    location = f"projects/{project_id}/locations/{location_id}"
    filter = (
        'create_time >= "2023-01-01T00:00:00Z" AND '
        'create_time <= "2023-01-31T23:59:59Z"'
    )

    request = contact_center_insights_v1.QueryMetricsRequest(
        location=location,
        filter=filter,
    )

    try:
        operation = client.query_metrics(request=request)
        print(f"Waiting for operation to complete: {operation.operation.name}")

        response = operation.result()
        print(f"Query metrics completed successfully:\n{response}")
    except google.api_core.exceptions.GoogleAPICallError as error:
        print(f"Failed to query metrics: {error}")
# [END contact_center_insights_query_metrics]
