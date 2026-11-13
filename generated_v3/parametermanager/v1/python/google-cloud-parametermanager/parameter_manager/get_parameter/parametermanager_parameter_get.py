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

# [START parametermanager_v1_parametermanager_parameter_get]
from google.api_core import exceptions
from google.api_core.client_options import ClientOptions
from google.cloud import parametermanager_v1


def get_parameter(project_id: str, location_id: str, parameter_id: str) -> None:
    """Retrieve metadata for a parameter from Parameter Manager.

    Args:
        project_id: The Google Cloud project ID (for example, 'example-project-id')
        location_id: The Google Cloud region where the service is located (for example, 'us-central1')
        parameter_id: ID of the Parameter (for example, 'example-parameter-id')
    """
    client_options = None
    if location_id != "global":
        client_options = ClientOptions(
            api_endpoint=f"{location_id}-parametermanager.googleapis.com"
        )

    client = parametermanager_v1.ParameterManagerClient(client_options=client_options)
    name = client.parameter_path(project_id, location_id, parameter_id)
    request = parametermanager_v1.GetParameterRequest(name=name)

    try:
        response = client.get_parameter(request=request)
        print(f"Retrieved parameter: {response.name}")
        print(f"Parameter format: {response.format.name}")
    except exceptions.GoogleAPICallError as err:
        print(f"Failed to retrieve parameter: {err}")
# [END parametermanager_v1_parametermanager_parameter_get]
