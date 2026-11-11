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

# [START dataplex_v1_dataplexservice_zone_get]
import google.api_core.exceptions
from google.cloud import dataplex_v1

client = dataplex_v1.DataplexServiceClient()


def get_zone(location_id: str, lake_id: str, zone_id: str, project_id: str) -> None:
    """Retrieve a Dataplex zone.

    Args:
        location_id: The Google Cloud region where the Dataplex lake and zone are located (for example, 'us-central1').
        lake_id: The ID of the Dataplex lake (for example, 'example-lake').
        zone_id: The ID of the Dataplex zone to retrieve.
        project_id: The Google Cloud project ID.
    """
    name = f"projects/{project_id}/locations/{location_id}/lakes/{lake_id}/zones/{zone_id}"

    try:
        response = client.get_zone(name=name)
        print(f"Retrieved zone: {response.name}")
        print(f"Display name: {response.display_name}")
        print(f"State: {response.state.name}")
        print(f"Type: {response.type_.name}")
    except google.api_core.exceptions.GoogleAPICallError as exc:
        print(f"Failed to retrieve zone: {exc}")
# [END dataplex_v1_dataplexservice_zone_get]
