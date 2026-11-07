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

# [START dataplex_v1_catalogservice_entry_get]
import google.api_core.exceptions
from google.cloud import dataplex_v1

client = dataplex_v1.CatalogServiceClient()


def get_entry(
    project_id: str, location_id: str, entry_group_id: str, entry_id: str
) -> None:
    """Retrieves a Dataplex catalog entry.

    Args:
        project_id: The Google Cloud project ID (for example, 'example-project-id').
        location_id: The Google Cloud region where the service is located (for example, 'us-central1').
        entry_group_id: ID of the EntryGroup (for example, 'example-entrygroup-id').
        entry_id: ID of the Entry (for example, 'example-entry-id').
    """
    name = f"projects/{project_id}/locations/{location_id}/entryGroups/{entry_group_id}/entries/{entry_id}"

    request = dataplex_v1.GetEntryRequest(
        name=name,
    )

    try:
        response = client.get_entry(request=request)
        print(f"Entry name: {response.name}")
        print(f"Entry type: {response.entry_type}")
    except google.api_core.exceptions.GoogleAPICallError as e:
        print(f"API call failed: {e}")
# [END dataplex_v1_catalogservice_entry_get]
