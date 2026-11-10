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

# [START cloudkms_v1_autokeyadmin_show_effective_autokey_config]
from google.api_core import exceptions
from google.cloud import kms_v1


def show_effective_autokey_config(project_id: str) -> None:
    """Retrieves the effective Cloud KMS Autokey configuration for a project.

    Args:
        project_id: The Google Cloud project ID for which to show the effective Autokey configuration.
    """
    client = kms_v1.AutokeyAdminClient()

    parent = f"projects/{project_id}"

    request = kms_v1.ShowEffectiveAutokeyConfigRequest(
        parent=parent,
    )

    try:
        response = client.show_effective_autokey_config(request=request)
        print(f"Key project: {response.key_project}")
    except exceptions.GoogleAPICallError as error:
        print(f"API call failed: {error}")
# [END cloudkms_v1_autokeyadmin_show_effective_autokey_config]
