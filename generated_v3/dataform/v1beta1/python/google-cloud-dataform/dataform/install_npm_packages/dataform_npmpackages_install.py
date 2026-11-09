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

# [START dataform_v1beta1_dataform_install_npm_packages]
import google.api_core.exceptions
from google.cloud import dataform_v1beta1

client = dataform_v1beta1.DataformClient()


def install_npm_packages(
    project_id: str,
    location_id: str,
    repository_id: str,
    workspace_id: str,
) -> None:
    """Installs NPM packages in a Dataform workspace.

    Args:
        project_id: The Google Cloud project ID.
        location_id: The Google Cloud region where the Dataform repository is
          located (for example, 'us-central1').
        repository_id: The ID of the Dataform repository containing the workspace.
        workspace_id: The ID of the Dataform workspace in which to install NPM
          packages.
    """
    workspace = (
        f"projects/{project_id}/locations/{location_id}"
        f"/repositories/{repository_id}/workspaces/{workspace_id}"
    )

    request = dataform_v1beta1.InstallNpmPackagesRequest(
        workspace=workspace,
    )

    try:
        response = client.install_npm_packages(request=request)
        print(f"Installed NPM packages in workspace: {workspace}")
    except google.api_core.exceptions.GoogleAPICallError as error:
        print(f"Failed to install NPM packages: {error}")
# [END dataform_v1beta1_dataform_install_npm_packages]
