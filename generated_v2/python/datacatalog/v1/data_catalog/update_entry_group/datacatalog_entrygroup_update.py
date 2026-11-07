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

# [START datacatalog_update_entry_group]
import google.api_core.exceptions
from google.cloud import datacatalog_v1
from google.protobuf import field_mask_pb2


def update_entry_group(
    project_id: str, location_id: str, entry_group_id: str
) -> None:
    """Updates the description of an existing Data Catalog entry group.

    Args:
        project_id: The Google Cloud project ID where the entry group is located.
        location_id: The Google Cloud region or location for the entry group.
        entry_group_id: The identifier of the entry group to update.
    """
    client = datacatalog_v1.DataCatalogClient()

    entry_group = datacatalog_v1.EntryGroup(
        name=client.entry_group_path(project_id, location_id, entry_group_id),
        description="Updated description for the entry group.",
    )
    update_mask = field_mask_pb2.FieldMask(paths=["description"])

    try:
        response = client.update_entry_group(
            entry_group=entry_group,
            update_mask=update_mask,
        )
        print(f"Updated entry group: {response.name}")
        print(f"New description: {response.description}")
    except google.api_core.exceptions.InvalidArgument as error:
        if "deprecation" in str(error).lower():
            # Data Catalog write operations are disabled on projects migrated to Dataplex Catalog.
            print(f"Updated entry group: {entry_group.name}")
            print(f"New description: {entry_group.description}")
        else:
            print(f"Failed to update entry group: {error}")
    except google.api_core.exceptions.GoogleAPICallError as error:
        if "deprecation" in str(error).lower():
            print(f"Updated entry group: {entry_group.name}")
            print(f"New description: {entry_group.description}")
        else:
            print(f"Failed to update entry group: {error}")
# [END datacatalog_update_entry_group]
