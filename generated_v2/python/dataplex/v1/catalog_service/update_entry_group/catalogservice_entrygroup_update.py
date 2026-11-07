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

# [START dataplex_v1_catalogservice_entrygroup_update]
import google.api_core.exceptions
from google.cloud import dataplex_v1
from google.protobuf import field_mask_pb2

client = dataplex_v1.CatalogServiceClient()


def update_entry_group(project_id: str, location_id: str, entry_group_id: str) -> None:
    """Updates the description of an existing Dataplex entry group.

    Args:
        project_id: The Google Cloud project ID.
        location_id: The Google Cloud region where the entry group is located, such as 'us-central1'.
        entry_group_id: The identifier of the existing entry group to update.
    """
    entry_group = dataplex_v1.EntryGroup(
        name=f"projects/{project_id}/locations/{location_id}/entryGroups/{entry_group_id}",
        description="Updated description for the entry group",
    )
    update_mask = field_mask_pb2.FieldMask(paths=["description"])

    try:
        operation = client.update_entry_group(
            entry_group=entry_group,
            update_mask=update_mask,
        )
        response = operation.result()
        print(f"Updated entry group: {response.name}")
        print(f"Description: {response.description}")
    except google.api_core.exceptions.GoogleAPICallError as e:
        print(f"Update failed: {e}")
# [END dataplex_v1_catalogservice_entrygroup_update]
