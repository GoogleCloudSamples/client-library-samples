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

# [START dataplex_v1_catalogservice_entrytype_create]
import os

import google.api_core.exceptions
import google.auth
from google.cloud import dataplex_v1


def create_entry_type(location_id: str, entry_type_id: str) -> None:
    """Creates an entry type in Dataplex Catalog.

    Args:
        location_id: The Google Cloud region where the service is located (for example, 'us-central1').
        entry_type_id: ID of the EntryType (for example, 'example-entrytype-id').
    """
    client = dataplex_v1.CatalogServiceClient()

    _, project_number = google.auth.default()
    if not project_number:
        project_number = os.getenv("GOOGLE_CLOUD_PROJECT")

    parent = f"projects/{project_number}/locations/{location_id}"
    entry_type = dataplex_v1.EntryType(
        display_name="Custom Entry Type",
        description="Description of custom entry type",
    )

    try:
        operation = client.create_entry_type(
            parent=parent,
            entry_type_id=entry_type_id,
            entry_type=entry_type,
        )
        response = operation.result()
        print(f"Created entry type: {response.name}")
    except google.api_core.exceptions.GoogleAPICallError as e:
        print(f"API call failed: {e}")
# [END dataplex_v1_catalogservice_entrytype_create]
