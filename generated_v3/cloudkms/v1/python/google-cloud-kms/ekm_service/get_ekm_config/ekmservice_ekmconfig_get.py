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

# [START cloudkms_v1_ekmservice_ekmconfig_get]
from google.api_core import exceptions
from google.cloud import kms_v1


def get_ekm_config(project_id: str, location_id: str) -> None:
    """Retrieves the EKM configuration for a project and location.

    Args:
        project_id: The Google Cloud project ID.
        location_id: The Google Cloud location (for example, 'global' or 'us-central1').
    """
    client = kms_v1.EkmServiceClient()
    name = f"projects/{project_id}/locations/{location_id}/ekmConfig"

    try:
        response = client.get_ekm_config(name=name)
        print(f"EKM configuration name: {response.name}")
        print(f"Default EKM connection: {response.default_ekm_connection}")
    except exceptions.GoogleAPICallError as error:
        print(f"Failed to retrieve EKM configuration: {error}")
# [END cloudkms_v1_ekmservice_ekmconfig_get]
