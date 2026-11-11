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

# [START dataplex_v1_catalogservice_entrytype_delete]
import os

import google.api_core.exceptions
import google.auth
import google.auth.exceptions
from google.cloud import dataplex_v1


def delete_entry_type(location_id: str, entry_type_id: str) -> None:
    """Deletes an entry type in Dataplex Catalog.

    Args:
        location_id: The Google Cloud region where the service is located (for example, 'us-central1').
        entry_type_id: The identifier of the entry type (for example, 'example-entry-type-id').
    """
    project_number = os.getenv("GOOGLE_CLOUD_PROJECT")
    if not project_number:
        try:
            _, project_number = google.auth.default()
        except google.auth.exceptions.GoogleAuthError:
            project_number = None
    if not project_number:
        project_number = "123456789012"

    name = (
        f"projects/{project_number}/locations/{location_id}/entryTypes/{entry_type_id}"
    )

    client = dataplex_v1.CatalogServiceClient()

    request = dataplex_v1.DeleteEntryTypeRequest(
        name=name,
    )

    try:
        operation = client.delete_entry_type(request=request)
        operation.result()
        print(f"Deleted entry type: {name}")
    except google.api_core.exceptions.GoogleAPICallError as error:
        print(f"Failed to delete entry type: {error.message}")
# [END dataplex_v1_catalogservice_entrytype_delete]
