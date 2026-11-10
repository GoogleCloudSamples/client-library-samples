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

# [START clouddeploy_v1_clouddeploy_deliverypipeline_delete]
import google.api_core.exceptions
from google.cloud import deploy_v1


def delete_delivery_pipeline(
    project_id: str, delivery_pipeline_id: str, location_id: str
) -> None:
    """Deletes a delivery pipeline in Google Cloud Deploy.

    Args:
        project_id: The Google Cloud project ID (for example, 'example-project-id').
        delivery_pipeline_id: The ID of the DeliveryPipeline to delete. Must match regex '^[a-z]([a-z0-9-]{0,61}[a-z0-9])?$'.
        location_id: The Google Cloud region ID (for example, 'us-central1').
    """
    client = deploy_v1.CloudDeployClient()

    name = f"projects/{project_id}/locations/{location_id}/deliveryPipelines/{delivery_pipeline_id}"

    try:
        operation = client.delete_delivery_pipeline(name=name)
        print(f"Waiting for operation {operation.operation.name} to complete...")
        operation.result()
        print(f"Deleted delivery pipeline: {name}")
    except google.api_core.exceptions.GoogleAPICallError as error:
        print(f"Failed to delete delivery pipeline: {error}")
# [END clouddeploy_v1_clouddeploy_deliverypipeline_delete]
