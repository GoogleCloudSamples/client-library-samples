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

# [START vmmigration_v1_vmmigration_imageimport_get]
import google.api_core.exceptions
from google.cloud import vmmigration_v1

client = vmmigration_v1.VmMigrationClient()


def get_image_import(
    project_id: str, location_id: str, image_import_id: str
) -> None:
    """Retrieves details of a specific ImageImport resource.

    Args:
        project_id: The Google Cloud project ID.
        location_id: The Google Cloud region of the ImageImport resource (for example, 'us-central1').
        image_import_id: The identifier of the ImageImport resource to retrieve.
    """
    name = f"projects/{project_id}/locations/{location_id}/imageImports/{image_import_id}"

    request = vmmigration_v1.GetImageImportRequest(name=name)

    try:
        response = client.get_image_import(request=request)
        print(f"Retrieved image import: {response.name}")
        print(f"Creation time: {response.create_time}")
    except google.api_core.exceptions.GoogleAPICallError as error:
        print(f"Failed to retrieve image import: {error}")


# [END vmmigration_v1_vmmigration_imageimport_get]
