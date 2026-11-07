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

# [START dlp_v2_dlpservice_connections_search]
import google.api_core.exceptions
from google.cloud import dlp_v2

client = dlp_v2.DlpServiceClient()


def search_connections(project_id: str, location_id: str) -> None:
    """Use the search_connections method.

    Args:
        project_id: The Google Cloud project ID to search connections in.
        location_id: The geographic location, or '-' wildcard to search
          connections across all locations.
    """
    parent = f"projects/{project_id}/locations/{location_id}"

    try:
        response = client.search_connections(request={"parent": parent})
        for connection in response:
            print(f"Connection name: {connection.name}")
            print(f"State: {connection.state.name}")
    except google.api_core.exceptions.GoogleAPICallError as error:
        print(f"Error searching connections: {error}")
# [END dlp_v2_dlpservice_connections_search]
