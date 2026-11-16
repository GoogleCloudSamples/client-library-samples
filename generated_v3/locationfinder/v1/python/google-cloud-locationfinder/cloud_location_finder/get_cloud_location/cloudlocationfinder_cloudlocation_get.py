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

# [START locationfinder_v1_cloudlocationfinder_cloudlocation_get]
import google.api_core.exceptions
from google.cloud import locationfinder_v1

client = locationfinder_v1.CloudLocationFinderClient()


def get_cloud_location(project_id: str, location_id: str, cloud_location_id: str) -> None:
    """Retrieves details of a specific cloud location.

    Args:
        project_id: The Google Cloud project ID.
        location_id: The Google Cloud location ID (for example, 'global').
        cloud_location_id: The identifier of the cloud location to retrieve.
    """
    name = f"projects/{project_id}/locations/{location_id}/cloudLocations/{cloud_location_id}"

    request = locationfinder_v1.GetCloudLocationRequest(
        name=name,
    )

    try:
        response = client.get_cloud_location(request=request)
        print(f"Retrieved cloud location: {response.name}")
        print(f"Display name: {response.display_name}")
    except google.api_core.exceptions.GoogleAPICallError as error:
        print(f"API call failed: {error}")
# [END locationfinder_v1_cloudlocationfinder_cloudlocation_get]
