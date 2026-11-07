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

# [START dataplex_v1_catalogservice_aspecttype_delete]
import google.api_core.exceptions
from google.cloud import dataplex_v1

client = dataplex_v1.CatalogServiceClient()


def delete_aspect_type(location_id: str, aspect_type_id: str, project_id: str) -> None:
    """Deletes an aspect type in Dataplex Catalog.

    Args:
        location_id: The Google Cloud region or 'global' location where the aspect type is located.
        aspect_type_id: The caller-chosen identifier of the aspect type to delete.
        project_id: The Google Cloud project ID.
    """
    name = f"projects/{project_id}/locations/{location_id}/aspectTypes/{aspect_type_id}"

    request = dataplex_v1.DeleteAspectTypeRequest(name=name)

    try:
        operation = client.delete_aspect_type(request=request)
        print(f"Waiting for deletion operation {operation.operation.name} to complete...")
        operation.result()
        print(f"Deleted aspect type: {name}")
    except google.api_core.exceptions.NotFound:
        print(f"Aspect type not found: {name}")
    except google.api_core.exceptions.GoogleAPICallError as e:
        print(f"Failed to delete aspect type: {e.message}")
# [END dataplex_v1_catalogservice_aspecttype_delete]
