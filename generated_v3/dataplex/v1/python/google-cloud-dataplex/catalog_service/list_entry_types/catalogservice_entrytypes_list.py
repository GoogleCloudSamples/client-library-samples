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

# [START dataplex_v1_catalogservice_entrytypes_list]
import google.api_core.exceptions
from google.cloud import dataplex_v1

client = dataplex_v1.CatalogServiceClient()


def list_entry_types(location_id: str, project_id: str) -> None:
    """Lists entry types in a specified location.

    Args:
        location_id: The Google Cloud region or 'global' (for example, 'us-central1').
        project_id: The Google Cloud project ID.
    """
    parent = f"projects/{project_id}/locations/{location_id}"

    request = dataplex_v1.ListEntryTypesRequest(
        parent=parent,
    )

    try:
        response = client.list_entry_types(request=request)
        for entry_type in response:
            print(f"Entry type name: {entry_type.name}")
            print(f"Display name: {entry_type.display_name}")
            print(f"Description: {entry_type.description}")
    except google.api_core.exceptions.GoogleAPICallError as e:
        print(f"Request failed: {e}")
# [END dataplex_v1_catalogservice_entrytypes_list]
