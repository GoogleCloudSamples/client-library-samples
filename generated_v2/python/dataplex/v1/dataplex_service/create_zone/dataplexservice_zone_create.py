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

# [START dataplex_v1_dataplexservice_zone_create]
import google.api_core.exceptions
from google.cloud import dataplex_v1

client = dataplex_v1.DataplexServiceClient()


def create_zone(location_id: str, project_id: str, lake_id: str, zone_id: str) -> None:
    """Creates a raw data zone within an existing Dataplex lake.

    Args:
        location_id: The Google Cloud region where the lake is located (for example, 'us-central1').
        project_id: The Google Cloud project ID.
        lake_id: The ID of the parent Dataplex lake (for example, 'example-lake-id').
        zone_id: The caller-chosen identifier for the zone (for example, 'example-raw-zone').
    """
    parent = f"projects/{project_id}/locations/{location_id}/lakes/{lake_id}"
    zone = dataplex_v1.Zone(
        type_=dataplex_v1.Zone.Type.RAW,
        resource_spec=dataplex_v1.Zone.ResourceSpec(
            location_type=dataplex_v1.Zone.ResourceSpec.LocationType.SINGLE_REGION
        ),
    )

    try:
        operation = client.create_zone(
            parent=parent,
            zone_id=zone_id,
            zone=zone,
        )
        response = operation.result()
        print(f"Created zone: {response.name}")
    except google.api_core.exceptions.GoogleAPICallError as error:
        print(f"API call failed during zone creation: {error.message}")
# [END dataplex_v1_dataplexservice_zone_create]
