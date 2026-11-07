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

# [START clouddeploy_v1_clouddeploy_release_get]
from google.api_core import exceptions
from google.cloud import deploy_v1


def get_release(
    project_id: str,
    release_id: str,
    location_id: str,
    delivery_pipeline_id: str,
) -> None:
    """Retrieves a Cloud Deploy release.

    Args:
        project_id: The Google Cloud project ID (for example, 'example-project-id').
        release_id: The ID of the Cloud Deploy release to retrieve.
        location_id: The Google Cloud region where the delivery pipeline and release are located (for example, 'us-central1').
        delivery_pipeline_id: The ID of the Cloud Deploy delivery pipeline.
    """
    client = deploy_v1.CloudDeployClient()

    name = f"projects/{project_id}/locations/{location_id}/deliveryPipelines/{delivery_pipeline_id}/releases/{release_id}"

    try:
        response = client.get_release(name=name)
        print(f"Release name: {response.name}")
        print(f"Release UID: {response.uid}")
    except exceptions.GoogleAPICallError as e:
        print(f"API call failed: {e}")


# [END clouddeploy_v1_clouddeploy_release_get]
