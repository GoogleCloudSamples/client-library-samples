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

# [START dataplex_v1_dataplexservice_zone_delete]
import google.api_core.exceptions
from google.cloud import dataplex_v1

client = dataplex_v1.DataplexServiceClient()


def delete_zone(location_id: str, lake_id: str, zone_id: str, project_id: str) -> None:
    """Use the delete_zone method

    Args:
        location_id: The Google Cloud region where the Dataplex lake is located (for example, 'us-central1').
        lake_id: The caller-chosen ID of the parent Dataplex lake.
        zone_id: The caller-chosen ID of the Dataplex zone to delete.
        project_id: The Google Cloud project ID.
    """
    name = f"projects/{project_id}/locations/{location_id}/lakes/{lake_id}/zones/{zone_id}"

    try:
        operation = client.delete_zone(name=name)
        operation.result()
        print(f"Deleted zone: {name}")
    except google.api_core.exceptions.GoogleAPICallError as e:
        print(f"Failed to delete zone: {e}")
# [END dataplex_v1_dataplexservice_zone_delete]
