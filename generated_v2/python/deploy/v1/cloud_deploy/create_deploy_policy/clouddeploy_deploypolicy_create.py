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

# [START clouddeploy_v1_clouddeploy_deploypolicy_create]
import google.api_core.exceptions
from google.cloud import deploy_v1


def create_deploy_policy(
    project_id: str, deploy_policy_id: str, location_id: str
) -> None:
    """Creates a deploy policy in Google Cloud Deploy.

    Args:
        project_id: The Google Cloud project ID (for example, 'example-project-id').
        deploy_policy_id: The caller-chosen ID of the DeployPolicy to create (for example, 'prod-restriction-policy').
        location_id: The Google Cloud location ID (for example, 'us-central1').
    """
    client = deploy_v1.CloudDeployClient()

    parent = f"projects/{project_id}/locations/{location_id}"

    selector = deploy_v1.DeployPolicyResourceSelector(
        target=deploy_v1.TargetAttribute(id="*")
    )
    weekly_window = deploy_v1.WeeklyWindow(
        days_of_week=["MONDAY", "TUESDAY", "WEDNESDAY", "THURSDAY", "FRIDAY"],
        start_time={"hours": 9, "minutes": 0},
        end_time={"hours": 17, "minutes": 0},
    )
    time_windows = deploy_v1.TimeWindows(
        time_zone="America/New_York",
        weekly_windows=[weekly_window],
    )
    rollout_restriction = deploy_v1.RolloutRestriction(
        id="block-prod",
        time_windows=time_windows,
    )
    rule = deploy_v1.PolicyRule(rollout_restriction=rollout_restriction)

    deploy_policy = deploy_v1.DeployPolicy(
        description="Deployment policy for production targets.",
        selectors=[selector],
        rules=[rule],
    )

    try:
        operation = client.create_deploy_policy(
            parent=parent,
            deploy_policy_id=deploy_policy_id,
            deploy_policy=deploy_policy,
        )
        response = operation.result()
        print(f"Created deploy policy: {response.name}")
    except google.api_core.exceptions.GoogleAPICallError as e:
        print(f"Failed to create deploy policy: {e}")
# [END clouddeploy_v1_clouddeploy_deploypolicy_create]
