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

# [START locationfinder_v1_cloudlocationfinder_cloudlocations_search]
import google.api_core.exceptions
from google.cloud import locationfinder_v1


def search_cloud_locations(
    project_id: str, location_id: str, cloud_location_id: str
) -> None:
    """Searches cloud locations relative to a source cloud location.

    Args:
        project_id: The Google Cloud project ID (for example, 'example-project-id').
        location_id: The Google Cloud location for the Location Finder service (for example, 'global').
        cloud_location_id: The identifier of the source cloud location (for example, 'gcp-us-east1' or 'aws-us-east-1').
    """
    client = locationfinder_v1.CloudLocationFinderClient()

    # Cloud location identifiers require a provider prefix (for example, 'gcp-us-east1').
    if not cloud_location_id.startswith(("gcp-", "aws-", "azure-", "oci-")):
        cloud_location_id = f"gcp-{cloud_location_id}"

    source_cloud_location = (
        f"projects/{project_id}/locations/{location_id}/cloudLocations/{cloud_location_id}"
    )
    parent = f"projects/{project_id}/locations/{location_id}"

    request = locationfinder_v1.SearchCloudLocationsRequest(
        parent=parent,
        source_cloud_location=source_cloud_location,
    )

    try:
        pager = client.search_cloud_locations(request=request)
        for cloud_location in pager:
            print(f"Name: {cloud_location.name}")
            print(f"Display Name: {cloud_location.display_name}")
    except google.api_core.exceptions.GoogleAPICallError as e:
        print(f"API call failed: {e}")
# [END locationfinder_v1_cloudlocationfinder_cloudlocations_search]
