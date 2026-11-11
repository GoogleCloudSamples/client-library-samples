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

# [START datastream_v1_datastream_connectionprofiles_list]
import google.api_core.exceptions
from google.cloud import datastream_v1


def list_connection_profiles(project_id: str, location_id: str) -> None:
    """Lists connection profiles in a specified Google Cloud region.

    Args:
        project_id: The Google Cloud project ID.
        location_id: The Google Cloud region ID (for example, 'us-central1').
    """
    client = datastream_v1.DatastreamClient()
    parent = f"projects/{project_id}/locations/{location_id}"

    try:
        request = datastream_v1.ListConnectionProfilesRequest(
            parent=parent,
        )
        page_result = client.list_connection_profiles(request=request)

        for profile in page_result:
            print(f"Resource name: {profile.name}")
            print(f"Display name: {profile.display_name}")
    except google.api_core.exceptions.GoogleAPICallError as error:
        print(f"Error listing connection profiles: {error}")
# [END datastream_v1_datastream_connectionprofiles_list]
