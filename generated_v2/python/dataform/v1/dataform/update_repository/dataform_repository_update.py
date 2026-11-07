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

# [START dataform_v1_dataform_repository_update]
import google.api_core.exceptions
from google.cloud import dataform_v1
from google.protobuf import field_mask_pb2

client = dataform_v1.DataformClient()


def update_repository(project_id: str, location_id: str, repository_id: str) -> None:
    """Use the update_repository method.

    Args:
        project_id: The Google Cloud project ID.
        location_id: The Google Cloud region/location ID.
        repository_id: The ID of the Dataform repository to update.
    """
    repository_path = (
        f"projects/{project_id}/locations/{location_id}/repositories/{repository_id}"
    )

    repository = dataform_v1.Repository(
        name=repository_path,
        display_name="Updated Repository Display Name",
    )
    update_mask = field_mask_pb2.FieldMask(paths=["display_name"])

    try:
        response = client.update_repository(
            repository=repository,
            update_mask=update_mask,
        )
        print(f"Updated repository: {response.name}")
        print(f"New display name: {response.display_name}")
    except google.api_core.exceptions.GoogleAPICallError as e:
        print(f"Failed to update repository: {e}")
# [END dataform_v1_dataform_repository_update]
