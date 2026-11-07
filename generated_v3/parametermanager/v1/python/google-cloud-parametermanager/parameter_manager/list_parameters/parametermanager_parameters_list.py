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

# [START parametermanager_v1_parametermanager_parameters_list]
import google.api_core.exceptions
from google.cloud import parametermanager_v1


def list_parameters(project_id: str, location_id: str) -> None:
    """Lists parameters in a specified project and location.

    Args:
        project_id: The Google Cloud project ID (for example, 'example-project-id').
        location_id: The Google Cloud region where the service is located (for example, 'us-central1').
    """
    if location_id != "global":
        client = parametermanager_v1.ParameterManagerClient(
            client_options={
                "api_endpoint": f"parametermanager.{location_id}.rep.googleapis.com"
            }
        )
    else:
        client = parametermanager_v1.ParameterManagerClient()

    parent = f"projects/{project_id}/locations/{location_id}"

    request = parametermanager_v1.ListParametersRequest(
        parent=parent,
    )

    try:
        page_result = client.list_parameters(request=request)
        for parameter in page_result:
            print(f"Parameter: {parameter.name}")
            print(f"Format: {parameter.format_.name}")
    except google.api_core.exceptions.GoogleAPICallError as e:
        print(f"API call failed: {e}")
# [END parametermanager_v1_parametermanager_parameters_list]
