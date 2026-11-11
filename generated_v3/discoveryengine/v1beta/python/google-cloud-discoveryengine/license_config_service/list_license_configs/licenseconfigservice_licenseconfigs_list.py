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

# [START discoveryengine_v1beta_licenseconfigservice_licenseconfigs_list]
import google.api_core.exceptions
from google.cloud import discoveryengine_v1beta


def list_license_configs(project_id: str, location_id: str) -> None:
    """Lists license configs in a Google Cloud project and location.

    Args:
        project_id: The Google Cloud project ID.
        location_id: The Google Cloud location (for example, 'global').
    """
    client = discoveryengine_v1beta.LicenseConfigServiceClient()

    # Construct the parent resource path.
    parent = f"projects/{project_id}/locations/{location_id}"

    request = discoveryengine_v1beta.ListLicenseConfigsRequest(
        parent=parent,
    )

    try:
        response = client.list_license_configs(request=request)
        has_configs = False
        for license_config in response:
            print(f"License config: {license_config.name}")
            has_configs = True
        if not has_configs:
            print("No license configs found.")
    except google.api_core.exceptions.GoogleAPICallError as error:
        print(f"Request failed: {error}")
# [END discoveryengine_v1beta_licenseconfigservice_licenseconfigs_list]
