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

# [START parametermanager_v1_parametermanager_parameterversion_delete]
import google.api_core.exceptions
from google.cloud import parametermanager_v1

client = parametermanager_v1.ParameterManagerClient()


def delete_parameter_version(
    project_id: str,
    location_id: str,
    parameter_id: str,
    parameter_version_id: str,
) -> None:
    """Use the delete_parameter_version method

    Args:
        project_id: The Google Cloud project ID (for example, 'example-project-id')
        location_id: The Google Cloud location ID (for example, 'global' or 'us-central1')
        parameter_id: The ID of the parent Parameter resource (for example, 'example-parameter')
        parameter_version_id: The ID of the ParameterVersion to delete (for example, 'v1'). Version aliases such as 'latest' are forbidden.
    """
    name = f"projects/{project_id}/locations/{location_id}/parameters/{parameter_id}/versions/{parameter_version_id}"

    try:
        client.delete_parameter_version(name=name)
        print(f"Deleted parameter version: {name}")
    except google.api_core.exceptions.GoogleAPICallError as error:
        print(f"Failed to delete parameter version: {error}")
# [END parametermanager_v1_parametermanager_parameterversion_delete]
