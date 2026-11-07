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

# [START dataplex_v1_catalogservice_entry_create]
import google.api_core.exceptions
from google.cloud import dataplex_v1

client = dataplex_v1.CatalogServiceClient()


def create_entry(
    project_id: str,
    location_id: str,
    entry_group_id: str,
    entry_id: str,
    entry_type_id: str,
) -> None:
    """Use the create_entry method

    Args:
        project_id: The Google Cloud project ID (for example, 'example-project-id')
        location_id: The Google Cloud region where the service is located (for example, 'us-central1')
        entry_group_id: Identifier of the existing parent EntryGroup (for example, 'example-entrygroup-id').
        entry_id: Caller-chosen identifier of the Entry to create (for example, 'example-entry-id'). Must be unique within the EntryGroup.
        entry_type_id: Identifier of the existing EntryType defining the entry schema and type (for example, 'example-entry-type-id').
    """
    parent = f"projects/{project_id}/locations/{location_id}/entryGroups/{entry_group_id}"
    entry_type = f"projects/{project_id}/locations/{location_id}/entryTypes/{entry_type_id}"

    entry_source = dataplex_v1.EntrySource(
        display_name="Example Entry Display Name",
        description="Entry created via Dataplex Catalog API",
    )

    entry = dataplex_v1.Entry(
        entry_type=entry_type,
        entry_source=entry_source,
    )

    request = dataplex_v1.CreateEntryRequest(
        parent=parent,
        entry_id=entry_id,
        entry=entry,
    )

    try:
        response = client.create_entry(request=request)
        print(f"Successfully created entry: {response.name}")
    except google.api_core.exceptions.GoogleAPICallError as e:
        print(f"Failed to create entry: {e.message}")
# [END dataplex_v1_catalogservice_entry_create]
