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

# [START dataplex_v1_catalogservice_entry_delete]
import google.api_core.exceptions
from google.cloud import dataplex_v1

client = dataplex_v1.CatalogServiceClient()


def delete_entry(
    project_id: str, location_id: str, entry_group_id: str, entry_id: str
) -> None:
    """Deletes an Entry from an EntryGroup in Dataplex Catalog.

    Args:
        project_id: The Google Cloud project ID (for example, 'example-project-id').
        location_id: The Google Cloud region where the EntryGroup and Entry are located (for example, 'us-central1').
        entry_group_id: The caller-chosen identifier of the EntryGroup containing the entry (for example, 'example-entrygroup-id').
        entry_id: The caller-chosen identifier of the Entry to delete (for example, 'example-entry-id').
    """
    name = (
        f"projects/{project_id}/locations/{location_id}"
        f"/entryGroups/{entry_group_id}/entries/{entry_id}"
    )

    request = dataplex_v1.DeleteEntryRequest(name=name)

    try:
        response = client.delete_entry(request=request)
        print(f"Deleted entry: {response.name}")
    except google.api_core.exceptions.GoogleAPICallError as error:
        print(f"Failed to delete entry: {error}")


# [END dataplex_v1_catalogservice_entry_delete]
