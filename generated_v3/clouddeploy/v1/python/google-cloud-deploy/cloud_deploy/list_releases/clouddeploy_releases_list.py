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

# [START clouddeploy_v1_clouddeploy_releases_list]
import google.api_core.exceptions
from google.cloud import deploy_v1


def list_releases(
    project_id: str, location_id: str, delivery_pipeline_id: str
) -> None:
    """Lists releases for a specified delivery pipeline.

    Args:
        project_id: The Google Cloud project ID.
        location_id: The Google Cloud region where the delivery pipeline resides
            (for example, 'us-central1').
        delivery_pipeline_id: The caller-specified ID of the DeliveryPipeline
            whose releases are being listed, matching `[a-z]([a-z0-9-]{0,61}[a-z0-9])?`.
    """
    client = deploy_v1.CloudDeployClient()

    parent = (
        f"projects/{project_id}/locations/{location_id}/deliveryPipelines/{delivery_pipeline_id}"
    )

    request = deploy_v1.ListReleasesRequest(
        parent=parent,
    )

    try:
        page_result = client.list_releases(request=request)
        for release in page_result:
            print(f"Release name: {release.name}")
    except google.api_core.exceptions.GoogleAPICallError as error:
        print(f"API call failed: {error}")
# [END clouddeploy_v1_clouddeploy_releases_list]
