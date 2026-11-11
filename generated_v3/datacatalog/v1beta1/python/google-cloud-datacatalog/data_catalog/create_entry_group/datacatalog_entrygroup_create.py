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

# [START datacatalog_v1beta1_datacatalog_entrygroup_create]
import google.api_core.exceptions
from google.cloud import datacatalog_v1beta1


def create_entry_group(
    project_id: str, location_id: str, entry_group_id: str
) -> None:
    """Creates an entry group in Data Catalog.

    Args:
        project_id: The Google Cloud project ID (for example,
          'example-project-id').
        location_id: The Google Cloud region where the service is located (for
          example, 'us-central1').
        entry_group_id: Caller-chosen ID of the EntryGroup (for example,
          'example_entry_group'). Must begin with a letter or underscore,
          contain only letters, numbers, and underscores, and be at most 64
          characters long.
    """
    client = datacatalog_v1beta1.DataCatalogClient()

    parent = f"projects/{project_id}/locations/{location_id}"
    entry_group = datacatalog_v1beta1.EntryGroup(
        display_name="Sample Entry Group",
        description="An entry group for sample resources",
    )

    try:
        response = client.create_entry_group(
            parent=parent,
            entry_group_id=entry_group_id,
            entry_group=entry_group,
        )
        print(f"Created entry group: {response.name}")
    except google.api_core.exceptions.AlreadyExists:
        print(f"Entry group already exists: {entry_group_id}")
    except google.api_core.exceptions.BadRequest as e:
        print(f"Data Catalog deprecation notice: {e}")
# [END datacatalog_v1beta1_datacatalog_entrygroup_create]
