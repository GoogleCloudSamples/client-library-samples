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

# [START osconfig_v1_osconfigservice_patchdeployment_create]
import google.api_core.exceptions
from google.cloud import osconfig_v1

client = osconfig_v1.OsConfigServiceClient()


def create_patch_deployment(project_id: str, patch_deployment_id: str) -> None:
    """Use the create_patch_deployment method

    Args:
        project_id: The Google Cloud project ID (for example, 'example-project-id')
        patch_deployment_id: ID of the PatchDeployment (for example, 'example-patchdeployment-id')
    """
    parent = f"projects/{project_id}"

    instance_filter = osconfig_v1.PatchInstanceFilter(all=True)
    patch_config = osconfig_v1.PatchConfig(
        reboot_config=osconfig_v1.PatchConfig.RebootConfig.DEFAULT
    )
    recurring_schedule = osconfig_v1.RecurringSchedule(
        time_zone={"id": "America/New_York"},
        time_of_day={"hours": 2, "minutes": 0},
        frequency=osconfig_v1.RecurringSchedule.Frequency.WEEKLY,
        weekly=osconfig_v1.WeeklySchedule(day_of_week="SUNDAY"),
    )

    patch_deployment = osconfig_v1.PatchDeployment(
        description="Recurring weekly patch deployment",
        instance_filter=instance_filter,
        patch_config=patch_config,
        recurring_schedule=recurring_schedule,
    )

    try:
        response = client.create_patch_deployment(
            parent=parent,
            patch_deployment=patch_deployment,
            patch_deployment_id=patch_deployment_id,
        )
        print(f"Created patch deployment: {response.name}")
    except google.api_core.exceptions.GoogleAPICallError as error:
        print(f"Error creating patch deployment: {error}")
# [END osconfig_v1_osconfigservice_patchdeployment_create]
