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

# [START composer_v1_imageversions_imageversions_list]
import google.api_core.exceptions
from google.cloud.orchestration.airflow import service_v1


def list_image_versions(project_id: str, location_id: str) -> None:
    """List Cloud Composer image versions for a project and location.

    Args:
        project_id: The Google Cloud project ID.
        location_id: The Google Cloud region location ID (for example, 'us-central1').
    """
    client = service_v1.ImageVersionsClient()
    parent = f"projects/{project_id}/locations/{location_id}"

    request = service_v1.ListImageVersionsRequest(
        parent=parent,
    )

    try:
        page_result = client.list_image_versions(request=request)
        for image_version in page_result:
            print(f"Image version ID: {image_version.image_version_id}")
    except google.api_core.exceptions.GoogleAPICallError as error:
        print(f"Failed to list image versions: {error}")
# [END composer_v1_imageversions_imageversions_list]
