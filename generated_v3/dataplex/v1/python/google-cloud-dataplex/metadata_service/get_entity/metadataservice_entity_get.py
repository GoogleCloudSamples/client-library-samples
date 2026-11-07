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

# [START dataplex_v1_metadataservice_entity_get]
import google.api_core.exceptions
from google.cloud import dataplex_v1

client = dataplex_v1.MetadataServiceClient()


def get_entity(
    location_id: str, lake_id: str, zone_id: str, entity_id: str, project_id: str
) -> None:
    """Retrieve metadata entity details from Dataplex.

    Args:
        location_id: The Google Cloud region where the Dataplex lake is located (for example, 'us-central1').
        lake_id: The identifier of the Dataplex lake.
        zone_id: The identifier of the Dataplex zone.
        entity_id: The identifier of the Dataplex metadata entity (letters, numbers, and underscores).
        project_id: The Google Cloud project ID.
    """
    name = (
        f"projects/{project_id}/locations/{location_id}/"
        f"lakes/{lake_id}/zones/{zone_id}/entities/{entity_id}"
    )

    request = dataplex_v1.GetEntityRequest(name=name)

    try:
        response = client.get_entity(request=request)
        print(f"Entity name: {response.name}")
        print(f"Data path: {response.data_path}")
        print(f"System: {response.system.name}")
    except google.api_core.exceptions.GoogleAPICallError as e:
        print(f"Failed to retrieve entity: {e}")
# [END dataplex_v1_metadataservice_entity_get]
