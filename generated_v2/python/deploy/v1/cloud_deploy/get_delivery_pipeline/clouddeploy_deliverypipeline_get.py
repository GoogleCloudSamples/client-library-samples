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

# [START clouddeploy_v1_clouddeploy_deliverypipeline_get]
from google.api_core import exceptions
from google.cloud import deploy_v1


def get_delivery_pipeline(
    project_id: str, location_id: str, delivery_pipeline_id: str
) -> None:
    """Retrieves a Cloud Deploy delivery pipeline.

    Args:
        project_id: The Google Cloud project ID (for example,
          'example-project-id').
        location_id: The Google Cloud region ID (for example, 'us-central1').
        delivery_pipeline_id: The ID of the Cloud Deploy delivery pipeline to
          retrieve (for example, 'example-pipeline').
    """
    client = deploy_v1.CloudDeployClient()

    name = f"projects/{project_id}/locations/{location_id}/deliveryPipelines/{delivery_pipeline_id}"

    request = deploy_v1.GetDeliveryPipelineRequest(
        name=name,
    )

    try:
        response = client.get_delivery_pipeline(request=request)
        print(f"Delivery pipeline retrieved: {response.name}")
        print(f"Pipeline UID: {response.uid}")
    except exceptions.GoogleAPICallError as error:
        print(f"Failed to retrieve delivery pipeline: {error}")


# [END clouddeploy_v1_clouddeploy_deliverypipeline_get]
