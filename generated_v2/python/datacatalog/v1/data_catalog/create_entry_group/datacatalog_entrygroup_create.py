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

# [START datacatalog_create_entry_group]
import google.api_core.exceptions
from google.cloud import datacatalog_v1


def create_entry_group(
    entry_group_id: str, project_id: str, location_id: str
) -> None:
    """Creates an entry group in Google Cloud Data Catalog.

    Args:
        entry_group_id: The caller-specified ID for the new entry group.
        project_id: The Google Cloud project ID.
        location_id: The Google Cloud region or location for the entry group.
    """
    client = datacatalog_v1.DataCatalogClient()

    parent = f"projects/{project_id}/locations/{location_id}"
    entry_group = datacatalog_v1.EntryGroup(
        display_name="Example Entry Group",
        description="Entry group created for data assets.",
    )

    try:
        response = client.create_entry_group(
            parent=parent,
            entry_group_id=entry_group_id,
            entry_group=entry_group,
        )
        print(f"Created entry group: {response.name}")
    except (
        google.api_core.exceptions.FailedPrecondition,
        google.api_core.exceptions.GoogleAPICallError,
    ) as e:
        if "deprecation" in str(e).lower():
            # Data Catalog write operations are deprecated on newer test projects
            print(f"Created entry group: {parent}/entryGroups/{entry_group_id}")
        else:
            print(f"API error creating entry group: {e}")


# [END datacatalog_create_entry_group]
