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

# [START edgenetwork_v1_edgenetwork_zones_list]
import google.api_core.exceptions
from google.cloud import edgenetwork_v1


def list_zones(project_id: str, location_id: str) -> None:
    """Lists Edge Network zones for a given location.

    Args:
        project_id: The Google Cloud project ID.
        location_id: The Google Cloud location ID.
    """
    client = edgenetwork_v1.EdgeNetworkClient()
    parent = f"projects/{project_id}/locations/{location_id}"

    try:
        request = edgenetwork_v1.ListZonesRequest(parent=parent)
        response = client.list_zones(request=request)

        count = 0
        for zone in response:
            print(f"Zone: {zone.name}")
            count += 1

        if count == 0:
            print(f"No zones found in {parent}.")
    except google.api_core.exceptions.GoogleAPICallError as error:
        print(f"Failed to list zones: {error}")
# [END edgenetwork_v1_edgenetwork_zones_list]
