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

# [START gsuiteaddons_v1_gsuiteaddons_deployments_list]
import google.api_core.exceptions
from google.cloud import gsuiteaddons_v1

client = gsuiteaddons_v1.GSuiteAddOnsClient()


def list_deployments(project_id: str) -> None:
    """List Google Workspace add-on deployments for a project.

    Args:
        project_id: The Google Cloud project ID.
    """
    parent = f"projects/{project_id}"

    request = gsuiteaddons_v1.ListDeploymentsRequest(
        parent=parent,
    )

    try:
        response = client.list_deployments(request=request)
        for deployment in response:
            print(f"Deployment name: {deployment.name}")
    except google.api_core.exceptions.GoogleAPICallError as error:
        print(f"Failed to list deployments: {error}")
# [END gsuiteaddons_v1_gsuiteaddons_deployments_list]
