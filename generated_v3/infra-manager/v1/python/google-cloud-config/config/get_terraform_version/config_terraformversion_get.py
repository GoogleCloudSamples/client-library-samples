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

# [START infra-manager_v1_config_terraformversion_get]
import google.api_core.exceptions
from google.cloud import config_v1

client = config_v1.ConfigClient()


def get_terraform_version(
    project_id: str, location_id: str, terraform_version_id: str
) -> None:
    """Use the get_terraform_version method

    Args:
        project_id: The Google Cloud project ID (for example, 'example-project-id')
        location_id: The Google Cloud region where the service is located (for example, 'us-central1')
        terraform_version_id: ID of the TerraformVersion (for example, 'example-terraformversion-id')
    """
    name = f"projects/{project_id}/locations/{location_id}/terraformVersions/{terraform_version_id}"

    request = config_v1.GetTerraformVersionRequest(
        name=name,
    )

    try:
        response = client.get_terraform_version(request=request)
        print(f"Terraform version: {response.name}")
        print(f"State: {response.state}")
    except google.api_core.exceptions.GoogleAPICallError as error:
        print(f"Failed to get Terraform version: {error}")
# [END infra-manager_v1_config_terraformversion_get]
