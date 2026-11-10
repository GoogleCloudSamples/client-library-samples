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

# [START clouddeploy_v1_clouddeploy_rollout_cancel]
from google.api_core import exceptions
from google.cloud import deploy_v1


def cancel_rollout(
    project_id: str,
    location_id: str,
    delivery_pipeline_id: str,
    release_id: str,
    rollout_id: str,
) -> None:
    """Cancels a Google Cloud Deploy rollout.

    Args:
        project_id: The Google Cloud project ID (for example, 'example-project-id').
        location_id: The Google Cloud region where the service is located (for example, 'us-central1').
        delivery_pipeline_id: ID of the DeliveryPipeline (for example, 'example-deliverypipeline-id').
        release_id: ID of the Release (for example, 'example-release-id').
        rollout_id: ID of the Rollout (for example, 'example-rollout-id').
    """
    client = deploy_v1.CloudDeployClient()

    name = client.rollout_path(
        project_id, location_id, delivery_pipeline_id, release_id, rollout_id
    )

    request = deploy_v1.CancelRolloutRequest(name=name)

    try:
        response = client.cancel_rollout(request=request)
        print(f"Canceled rollout: {name}")
        print(response)
    except exceptions.GoogleAPICallError as e:
        print(f"API call failed: {e}")


# [END clouddeploy_v1_clouddeploy_rollout_cancel]
