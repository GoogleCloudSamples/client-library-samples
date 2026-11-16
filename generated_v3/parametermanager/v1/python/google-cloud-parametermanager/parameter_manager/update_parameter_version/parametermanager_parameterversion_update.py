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

# [START parametermanager_v1_parametermanager_parameterversion_update]
import google.api_core.exceptions
from google.cloud import parametermanager_v1
from google.protobuf import field_mask_pb2

client = parametermanager_v1.ParameterManagerClient()


def update_parameter_version(
    project_id: str,
    location_id: str,
    parameter_id: str,
    parameter_version_id: str,
) -> None:
    """Update the disabled state of a Parameter Version in Google Cloud Parameter Manager.

    Args:
        project_id: The Google Cloud project ID.
        location_id: The Google Cloud region or location (for example, 'global' or 'us-central1').
        parameter_id: The caller-chosen identifier of the parent parameter.
        parameter_version_id: The identifier of the parameter version to update.
    """
    version_name = f"projects/{project_id}/locations/{location_id}/parameters/{parameter_id}/versions/{parameter_version_id}"

    parameter_version = parametermanager_v1.ParameterVersion(
        name=version_name,
        disabled=True,
    )
    update_mask = field_mask_pb2.FieldMask(paths=["disabled"])

    try:
        response = client.update_parameter_version(
            parameter_version=parameter_version,
            update_mask=update_mask,
        )
        print(f"Updated parameter version: {response.name}")
        print(f"Disabled status: {response.disabled}")
    except google.api_core.exceptions.GoogleAPICallError as error:
        print(f"API error updating parameter version: {error}")
# [END parametermanager_v1_parametermanager_parameterversion_update]
