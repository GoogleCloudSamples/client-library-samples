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

# [START migrationcenter_v1_migrationcenter_source_update]
import google.api_core.exceptions
from google.cloud import migrationcenter_v1
from google.protobuf import field_mask_pb2

client = migrationcenter_v1.MigrationCenterClient()


def update_source(project_id: str, location_id: str, source_id: str) -> None:
    """Updates an existing Migration Center source.

    Args:
        project_id: The Google Cloud project ID.
        location_id: The Google Cloud location ID (for example, 'us-central1').
        source_id: The ID of the source to update.
    """
    source_name = (
        f"projects/{project_id}/locations/{location_id}/sources/{source_id}"
    )
    source = migrationcenter_v1.Source(
        name=source_name,
        description="Updated description",
    )
    update_mask = field_mask_pb2.FieldMask(paths=["description"])

    request = migrationcenter_v1.UpdateSourceRequest(
        source=source,
        update_mask=update_mask,
    )

    try:
        operation = client.update_source(request=request)
        response = operation.result()
        print(f"Updated source: {response.name}")
        print(f"Description: {response.description}")
    except google.api_core.exceptions.GoogleAPICallError as error:
        print(f"Failed to update source: {error}")
# [END migrationcenter_v1_migrationcenter_source_update]
