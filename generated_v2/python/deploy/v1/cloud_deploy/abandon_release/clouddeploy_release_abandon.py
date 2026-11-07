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

# [START clouddeploy_v1_clouddeploy_abandon_release]
import google.api_core.exceptions
from google.cloud import deploy_v1


def abandon_release(
    project_id: str,
    location_id: str,
    delivery_pipeline_id: str,
    release_id: str,
) -> None:
    """Abandons an existing release in Google Cloud Deploy.

    Args:
        project_id: The Google Cloud project ID (for example, 'example-project-id').
        location_id: The Google Cloud region where the Delivery Pipeline and Release reside (for example, 'us-central1').
        delivery_pipeline_id: The ID of the Delivery Pipeline (for example, 'example-delivery-pipeline').
        release_id: The ID of the Release to abandon (for example, 'example-release').
    """
    client = deploy_v1.CloudDeployClient()

    name = (
        f"projects/{project_id}/locations/{location_id}/"
        f"deliveryPipelines/{delivery_pipeline_id}/releases/{release_id}"
    )

    request = deploy_v1.AbandonReleaseRequest(name=name)

    try:
        response = client.abandon_release(request=request)
        print(f"Abandoned release: {name}")
    except google.api_core.exceptions.GoogleAPICallError as error:
        print(f"Failed to abandon release: {error}")
# [END clouddeploy_v1_clouddeploy_abandon_release]
