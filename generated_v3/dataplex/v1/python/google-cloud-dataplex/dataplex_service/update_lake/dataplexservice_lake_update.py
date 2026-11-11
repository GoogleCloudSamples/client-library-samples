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

# [START dataplex_v1_dataplexservice_lake_update]
import google.api_core.exceptions
from google.cloud import dataplex_v1
from google.protobuf import field_mask_pb2

client = dataplex_v1.DataplexServiceClient()


def update_lake(project_id: str, location_id: str, lake_id: str) -> None:
    """Updates the description of an existing Dataplex lake.

    Args:
        project_id: The Google Cloud project ID containing the Dataplex lake.
        location_id: The Google Cloud region where the Dataplex lake is located.
        lake_id: The identifier of the Dataplex lake to update.
    """
    lake_name = f"projects/{project_id}/locations/{location_id}/lakes/{lake_id}"

    update_mask = field_mask_pb2.FieldMask(paths=["description"])
    lake = dataplex_v1.Lake(
        name=lake_name,
        description="Updated description of the Dataplex lake",
    )

    try:
        operation = client.update_lake(
            lake=lake,
            update_mask=update_mask,
        )
        response = operation.result()
        print(f"Updated lake: {response.name}")
        print(f"Description: {response.description}")
    except google.api_core.exceptions.GoogleAPICallError as e:
        print(f"Failed to update lake: {e}")
# [END dataplex_v1_dataplexservice_lake_update]
