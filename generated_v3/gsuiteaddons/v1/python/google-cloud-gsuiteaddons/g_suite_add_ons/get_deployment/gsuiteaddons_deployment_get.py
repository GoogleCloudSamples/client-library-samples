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

# [START gsuiteaddons_v1_gsuiteaddons_deployment_get]
import google.api_core.exceptions
from google.cloud import gsuiteaddons_v1

client = gsuiteaddons_v1.GSuiteAddOnsClient()


def get_deployment(project_id: str, deployment_id: str) -> None:
    """Retrieves a Google Workspace add-on deployment.

    Args:
        project_id: The Google Cloud project ID.
        deployment_id: The deployment identifier.
    """
    name = f"projects/{project_id}/deployments/{deployment_id}"

    request = gsuiteaddons_v1.GetDeploymentRequest(
        name=name,
    )

    try:
        response = client.get_deployment(request=request)
        print(f"Retrieved deployment: {response.name}")
    except google.api_core.exceptions.GoogleAPICallError as e:
        print(f"API call failed: {e}")
# [END gsuiteaddons_v1_gsuiteaddons_deployment_get]
