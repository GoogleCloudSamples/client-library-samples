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

# [START gkehub_v1_gkehub_fleet_get]
import google.api_core.exceptions
from google.cloud import gkehub_v1

client = gkehub_v1.GkeHubClient()


def get_fleet(project_id: str, location_id: str, fleet_id: str) -> None:
    """Retrieves details of an existing fleet in GKE Hub.

    Args:
        project_id: The Google Cloud project ID (for example,
          'example-project-id')
        location_id: The Google Cloud region where the service is located (for
          example, 'us-central1')
        fleet_id: ID of the Fleet (for example, 'example-fleet-id')
    """
    name = f"projects/{project_id}/locations/{location_id}/fleets/{fleet_id}"

    try:
        response = client.get_fleet(name=name)
        print(f"Retrieved fleet: {response.name}")
        print(f"Fleet display name: {response.display_name}")
    except google.api_core.exceptions.GoogleAPICallError as error:
        print(f"Failed to get fleet: {error}")
# [END gkehub_v1_gkehub_fleet_get]
