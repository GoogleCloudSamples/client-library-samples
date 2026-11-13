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

# [START config_update_deployment_group]
from google.api_core import exceptions
from google.cloud import config_v1
from google.protobuf import field_mask_pb2


def update_deployment_group(
    project_id: str, location_id: str, deployment_group_id: str
) -> None:
    """Updates a deployment group in Infrastructure Manager.

    Args:
        project_id: The Google Cloud project ID.
        location_id: The Google Cloud region where the service is located.
        deployment_group_id: The ID of the deployment group.
    """
    client = config_v1.ConfigClient()

    deployment_group_name = (
        f"projects/{project_id}/locations/{location_id}/deploymentGroups/{deployment_group_id}"
    )

    deployment_group = config_v1.DeploymentGroup(
        name=deployment_group_name,
        labels={"status": "updated"},
    )

    update_mask = field_mask_pb2.FieldMask(paths=["labels"])

    request = config_v1.UpdateDeploymentGroupRequest(
        deployment_group=deployment_group,
        update_mask=update_mask,
    )

    try:
        operation = client.update_deployment_group(request=request)
        response = operation.result()
        print(f"Updated deployment group: {response.name}")
    except exceptions.GoogleAPICallError as e:
        print(f"Failed to update deployment group: {e}")
# [END config_update_deployment_group]
