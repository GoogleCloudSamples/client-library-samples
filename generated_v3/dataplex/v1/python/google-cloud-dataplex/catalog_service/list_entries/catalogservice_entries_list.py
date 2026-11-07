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

# [START dataplex_v1_catalogservice_entries_list]
import google.api_core.exceptions
from google.cloud import dataplex_v1

client = dataplex_v1.CatalogServiceClient()


def list_entries(project_id: str, location_id: str, entry_group_id: str) -> None:
    """Lists entries within a specified EntryGroup.

    Args:
        project_id: The Google Cloud project ID where the EntryGroup is located (for example, 'example-project-id').
        location_id: The Google Cloud location (region) where the EntryGroup is located (for example, 'us-central1').
        entry_group_id: The caller-specified identifier of the EntryGroup whose entries are to be listed (for example, 'example-entrygroup-id').
    """
    parent = (
        f"projects/{project_id}/locations/{location_id}/entryGroups/{entry_group_id}"
    )

    request = dataplex_v1.ListEntriesRequest(parent=parent)

    try:
        response = client.list_entries(request=request)
        for entry in response:
            print(f"Entry name: {entry.name}")
            print(f"Entry type: {entry.entry_type}")
    except google.api_core.exceptions.GoogleAPICallError as error:
        print(f"Failed to list entries: {error}")
# [END dataplex_v1_catalogservice_entries_list]
