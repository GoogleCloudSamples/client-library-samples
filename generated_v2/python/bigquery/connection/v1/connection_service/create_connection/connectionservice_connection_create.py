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

# [START bigqueryconnection_v1_connectionservice_connection_create]
import google.api_core.exceptions
from google.cloud import bigquery_connection_v1


def create_connection(project_id: str, location_id: str) -> None:
    """Creates a BigQuery connection in a specified project and location.

    Args:
        project_id: The Google Cloud project ID (for example,
          'example-project-id').
        location_id: The Google Cloud region where the service is located (for
          example, 'us-central1').
    """
    client = bigquery_connection_v1.ConnectionServiceClient()

    parent = client.common_location_path(project_id, location_id)

    # Configure a Cloud Resource connection for delegating access to external resources
    connection = bigquery_connection_v1.Connection(
        friendly_name="Example Cloud Resource Connection",
        description="Connection created via BigQuery Connection API",
        cloud_resource=bigquery_connection_v1.CloudResourceProperties(),
    )

    try:
        response = client.create_connection(
            parent=parent,
            connection=connection,
        )
        print(f"Created connection: {response.name}")
    except google.api_core.exceptions.GoogleAPICallError as e:
        print(f"Failed to create connection: {e}")
# [END bigqueryconnection_v1_connectionservice_connection_create]
