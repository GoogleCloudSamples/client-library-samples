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

# [START vmmigration_v1_vmmigration_imageimports_list]
import google.api_core.exceptions
from google.cloud import vmmigration_v1

client = vmmigration_v1.VmMigrationClient()


def list_image_imports(project_id: str, location_id: str) -> None:
    """Lists image imports in a specified project and location.

    Args:
        project_id: The Google Cloud project ID.
        location_id: The Google Cloud region, such as us-central1.
    """
    parent = f"projects/{project_id}/locations/{location_id}"

    request = vmmigration_v1.ListImageImportsRequest(
        parent=parent,
    )

    try:
        response = client.list_image_imports(request=request)
        for image_import in response:
            print(f"Image import name: {image_import.name}")
            print(f"Cloud Storage URI: {image_import.cloud_storage_uri}")
    except google.api_core.exceptions.GoogleAPICallError as error:
        print(f"Failed to list image imports: {error}")
# [END vmmigration_v1_vmmigration_imageimports_list]
