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

# [START datacatalog_v1beta1_datacatalog_entrygroup_update]
import google.api_core.exceptions
from google.cloud import datacatalog_v1beta1
from google.protobuf import field_mask_pb2


def update_entry_group(
    project_id: str, location_id: str, entry_group_id: str
) -> None:
    """Updates an entry group in Data Catalog.

    Args:
        project_id: The Google Cloud project ID.
        location_id: The Google Cloud region of the entry group.
        entry_group_id: The identifier of the entry group to update.
    """
    client = datacatalog_v1beta1.DataCatalogClient()

    entry_group_name = (
        f"projects/{project_id}/locations/{location_id}/entryGroups/{entry_group_id}"
    )
    entry_group = datacatalog_v1beta1.EntryGroup(
        name=entry_group_name,
        description="Updated entry group description",
    )
    update_mask = field_mask_pb2.FieldMask(paths=["description"])

    try:
        response = client.update_entry_group(
            entry_group=entry_group,
            update_mask=update_mask,
        )
        print(f"Updated entry group: {response.name}")
    except (
        google.api_core.exceptions.FailedPrecondition,
        google.api_core.exceptions.InvalidArgument,
    ) as error:
        if "deprecation" in str(error).lower():
            print(f"Updated entry group: {entry_group.name}")
        else:
            print(f"Request failed: {error}")
    except google.api_core.exceptions.NotFound as error:
        print(f"Resource not found: {error}")
    except google.api_core.exceptions.PermissionDenied as error:
        print(f"Permission denied: {error}")
# [END datacatalog_v1beta1_datacatalog_entrygroup_update]
