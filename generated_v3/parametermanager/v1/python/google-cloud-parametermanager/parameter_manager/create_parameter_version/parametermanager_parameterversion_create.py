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

# [START parametermanager_v1_parametermanager_parameterversion_create]
import google.api_core.exceptions
from google.cloud import parametermanager_v1


def create_parameter_version(
    project_id: str,
    location_id: str,
    parameter_id: str,
    parameter_version_id: str,
) -> None:
    """Creates a new parameter version.

    Args:
        project_id: The Google Cloud project ID (for example, 'example-project-id').
        location_id: The Google Cloud region where the service is located (for example, 'us-central1').
        parameter_id: The identifier of the parameter (for example, 'example-parameter-id').
        parameter_version_id: The identifier of the parameter version (for example, 'example-parameterversion-id').
    """
    # Regional Parameter Manager endpoints require client_options to route write operations.
    if location_id and location_id != "global":
        client_options = {
            "api_endpoint": f"{location_id}-parametermanager.googleapis.com"
        }
    else:
        client_options = None

    client = parametermanager_v1.ParameterManagerClient(
        client_options=client_options
    )

    parent = client.parameter_path(project_id, location_id, parameter_id)
    parameter_version = parametermanager_v1.ParameterVersion(
        payload=parametermanager_v1.ParameterVersionPayload(
            data=b"example-parameter-payload"
        )
    )

    request = parametermanager_v1.CreateParameterVersionRequest(
        parent=parent,
        parameter_version_id=parameter_version_id,
        parameter_version=parameter_version,
    )

    try:
        response = client.create_parameter_version(request=request)
        print(f"Created parameter version: {response.name}")
    except google.api_core.exceptions.GoogleAPICallError as e:
        print(f"API call failed: {e.message}")
# [END parametermanager_v1_parametermanager_parameterversion_create]
