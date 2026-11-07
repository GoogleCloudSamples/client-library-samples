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

# [START clouddeploy_v1_clouddeploy_deliverypipeline_create]
from google.api_core import exceptions
from google.cloud import deploy_v1


def create_delivery_pipeline(project_id: str, delivery_pipeline_id: str) -> None:
    """Create a delivery pipeline in Google Cloud Deploy.

    Args:
        project_id: The Google Cloud project ID (for example, 'example-project-id')
        delivery_pipeline_id: ID of the DeliveryPipeline (for example, 'example-deliverypipeline-id')
    """
    client = deploy_v1.CloudDeployClient()

    location_name = "us-central1"
    parent = f"projects/{project_id}/locations/{location_name}"
    delivery_pipeline = deploy_v1.DeliveryPipeline(
        description="Delivery pipeline for target deployment stages",
    )

    try:
        operation = client.create_delivery_pipeline(
            parent=parent,
            delivery_pipeline_id=delivery_pipeline_id,
            delivery_pipeline=delivery_pipeline,
        )
        response = operation.result()
        print(f"Created delivery pipeline: {response.name}")
    except exceptions.GoogleAPICallError as e:
        print(f"Failed to create delivery pipeline: {e}")
# [END clouddeploy_v1_clouddeploy_deliverypipeline_create]
