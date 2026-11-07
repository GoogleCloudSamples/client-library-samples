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

# [START clouddeploy_v1_clouddeploy_deliverypipeline_update]
import google.api_core.exceptions
from google.cloud import deploy_v1
from google.protobuf import field_mask_pb2


def update_delivery_pipeline(
    project_id: str, location_id: str, delivery_pipeline_id: str
) -> None:
    """Updates a Cloud Deploy delivery pipeline description.

    Args:
        project_id: The Google Cloud project ID.
        location_id: The Google Cloud region where the delivery pipeline is located (for example, 'us-central1').
        delivery_pipeline_id: The ID of the delivery pipeline to update.
    """
    client = deploy_v1.CloudDeployClient()

    update_mask = field_mask_pb2.FieldMask(paths=["description"])
    delivery_pipeline = deploy_v1.DeliveryPipeline(
        name=f"projects/{project_id}/locations/{location_id}/deliveryPipelines/{delivery_pipeline_id}",
        description="Updated delivery pipeline description",
    )

    request = deploy_v1.UpdateDeliveryPipelineRequest(
        update_mask=update_mask,
        delivery_pipeline=delivery_pipeline,
    )

    try:
        operation = client.update_delivery_pipeline(request=request)
        response = operation.result()
        print(f"Updated delivery pipeline: {response.name}")
    except google.api_core.exceptions.GoogleAPICallError as e:
        print(f"Request failed: {e}")
# [END clouddeploy_v1_clouddeploy_deliverypipeline_update]
