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

# [START clouddeploy_v1_clouddeploy_automation_update]
import google.api_core.exceptions
from google.cloud import deploy_v1
from google.protobuf import field_mask_pb2


def update_automation(
    project_id: str,
    location_id: str,
    delivery_pipeline_id: str,
    automation_id: str,
) -> None:
    """Updates an Automation resource.

    Args:
        project_id: The Google Cloud project ID.
        location_id: The Google Cloud region containing the Delivery Pipeline and Automation.
        delivery_pipeline_id: The ID of the Delivery Pipeline.
        automation_id: The ID of the Automation to update.
    """
    client = deploy_v1.CloudDeployClient()

    resource_name = (
        f"projects/{project_id}/locations/{location_id}/deliveryPipelines/"
        f"{delivery_pipeline_id}/automations/{automation_id}"
    )

    automation = deploy_v1.Automation(
        name=resource_name,
        description="Updated automation description",
    )
    update_mask = field_mask_pb2.FieldMask(paths=["description"])

    try:
        operation = client.update_automation(
            automation=automation,
            update_mask=update_mask,
        )
        print(f"Waiting for operation to complete: {operation.operation.name}")
        response = operation.result()
        print(f"Updated automation: {response.name}")
    except google.api_core.exceptions.GoogleAPICallError as error:
        print(f"Failed to update automation: {error}")
# [END clouddeploy_v1_clouddeploy_automation_update]
