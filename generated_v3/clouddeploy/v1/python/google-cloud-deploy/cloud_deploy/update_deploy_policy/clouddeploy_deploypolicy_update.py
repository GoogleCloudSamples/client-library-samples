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

# [START clouddeploy_v1_clouddeploy_deploypolicy_update]
from google.api_core import exceptions
from google.cloud import deploy_v1
from google.protobuf import field_mask_pb2


def update_deploy_policy(
    project_id: str, location_id: str, deploy_policy_id: str
) -> None:
    """Updates a Cloud Deploy policy.

    Args:
        project_id: The Google Cloud project ID.
        location_id: The Google Cloud region or location ID.
        deploy_policy_id: The ID of the deploy policy to update.
    """
    client = deploy_v1.CloudDeployClient()

    update_mask = field_mask_pb2.FieldMask(paths=["description"])
    deploy_policy = deploy_v1.DeployPolicy(
        name=f"projects/{project_id}/locations/{location_id}/deployPolicies/{deploy_policy_id}",
        description="Updated policy description",
    )

    try:
        operation = client.update_deploy_policy(
            deploy_policy=deploy_policy,
            update_mask=update_mask,
        )
        response = operation.result()
        print(f"Updated deploy policy: {response.name}")
    except exceptions.GoogleAPICallError as error:
        print(f"Failed to update deploy policy: {error}")


# [END clouddeploy_v1_clouddeploy_deploypolicy_update]
