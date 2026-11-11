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

# [START dataplex_v1_catalogservice_aspecttype_update]
import google.api_core.exceptions
from google.cloud import dataplex_v1
from google.protobuf import field_mask_pb2

client = dataplex_v1.CatalogServiceClient()


def update_aspect_type(project_id: str, location_id: str, aspect_type_id: str) -> None:
    """Updates an aspect type in Dataplex Catalog.

    Args:
        project_id: The Google Cloud project ID.
        location_id: The Google Cloud region or location for the AspectType (for
          example, 'us-central1' or 'global').
        aspect_type_id: The identifier of the aspect type to update. Caller-assigned
          when the aspect type was created.
    """
    aspect_type = dataplex_v1.AspectType(
        name=f"projects/{project_id}/locations/{location_id}/aspectTypes/{aspect_type_id}",
        description="Updated aspect type description",
    )
    update_mask = field_mask_pb2.FieldMask(paths=["description"])

    try:
        operation = client.update_aspect_type(
            aspect_type=aspect_type,
            update_mask=update_mask,
        )
        print("Waiting for operation to complete...")
        response = operation.result()
        print(f"Updated aspect type: {response.name}")
    except google.api_core.exceptions.GoogleAPICallError as error:
        print(f"Failed to update aspect type: {error}")
# [END dataplex_v1_catalogservice_aspecttype_update]
