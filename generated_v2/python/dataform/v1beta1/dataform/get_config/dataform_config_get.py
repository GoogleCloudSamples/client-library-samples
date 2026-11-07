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

# [START dataform_v1beta1_dataform_config_get]
import google.api_core.exceptions
from google.cloud import dataform_v1beta1

client = dataform_v1beta1.DataformClient()


def get_config(project_id: str, location_id: str) -> None:
    """Gets the Dataform configuration for a location.

    Args:
        project_id: The Google Cloud project ID.
        location_id: The Google Cloud region ID (for example, us-central1).
    """
    name = f"projects/{project_id}/locations/{location_id}/config"
    request = dataform_v1beta1.GetConfigRequest(name=name)

    try:
        response = client.get_config(request=request)
        print(f"Configuration resource name: {response.name}")
        print(f"Default KMS key name: {response.default_kms_key_name}")
    except google.api_core.exceptions.GoogleAPICallError as error:
        print(f"Request failed: {error}")
# [END dataform_v1beta1_dataform_config_get]
