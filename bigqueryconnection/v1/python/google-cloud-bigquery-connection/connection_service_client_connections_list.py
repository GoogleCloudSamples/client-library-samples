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

# [START bigqueryconnection_v1_connectionservice_connections_list]
import google.api_core.exceptions
from google.cloud import bigquery_connection_v1


def list_connections(project_id: str, location: str):
    """Prints all connections in a given project and location.

    Args:
        project_id: The Google Cloud project ID.
        location: The geographic location of the connections, e.g. "us", "us-central1".
    """
    client = bigquery_connection_v1.ConnectionServiceClient()

    parent = client.common_location_path(project_id, location)

    request = bigquery_connection_v1.ListConnectionsRequest(
        parent=parent,
        page_size=100,
    )

    print(f"Listing connections in project '{project_id}' and location '{location}':")

    try:
        for connection in client.list_connections(request=request):
            print(f"Connection ID: {connection.name.split('/')[-1]}")
            print(f"Friendly Name: {connection.friendly_name}")
            print(f"Has Credential: {connection.has_credential}")
            print("-" * 20)

        print("Finished listing connections.")

    except google.api_core.exceptions.InvalidArgument as e:
        print(
            f"Could not list connections. Please check that the project ID '{project_id}' "
            f"and location '{location}' are correct. Details: {e}"
        )


# [END bigqueryconnection_v1_connectionservice_connections_list]
