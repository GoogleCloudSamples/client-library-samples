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

# [START networksecurity_v1_intercept_interceptdeploymentgroup_update]
from google.api_core import exceptions
from google.cloud import network_security_v1
from google.protobuf import field_mask_pb2


def update_intercept_deployment_group(
    project_id: str, location_id: str, intercept_deployment_group_id: str
) -> None:
    """Updates an existing intercept deployment group.

    Args:
        project_id: The Google Cloud project ID.
        location_id: The cloud location for the intercept deployment group.
        intercept_deployment_group_id: The ID of the intercept deployment group to update.
    """
    client = network_security_v1.InterceptClient()

    deployment_group_name = (
        f"projects/{project_id}/locations/{location_id}/"
        f"interceptDeploymentGroups/{intercept_deployment_group_id}"
    )

    intercept_deployment_group = network_security_v1.InterceptDeploymentGroup(
        name=deployment_group_name,
        description="Updated intercept deployment group description",
    )
    update_mask = field_mask_pb2.FieldMask(paths=["description"])

    try:
        operation = client.update_intercept_deployment_group(
            intercept_deployment_group=intercept_deployment_group,
            update_mask=update_mask,
        )
        response = operation.result()
        print(f"Updated intercept deployment group: {response.name}")
    except exceptions.GoogleAPICallError as error:
        print(f"Operation failed: {error}")
# [END networksecurity_v1_intercept_interceptdeploymentgroup_update]
