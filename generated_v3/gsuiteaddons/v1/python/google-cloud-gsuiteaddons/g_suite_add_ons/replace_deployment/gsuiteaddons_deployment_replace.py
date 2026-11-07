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

# [START gsuiteaddons_v1_gsuiteaddons_replace_deployment]
import google.api_core.exceptions
from google.cloud import gsuiteaddons_v1

client = gsuiteaddons_v1.GSuiteAddOnsClient()


def replace_deployment(project_id: str, deployment_id: str) -> None:
    """Replaces an existing Google Workspace add-on deployment.

    Args:
        project_id: The Google Cloud project ID hosting the add-on deployment.
        deployment_id: The identifier of the deployment to replace.
    """
    deployment_name = f"projects/{project_id}/deployments/{deployment_id}"

    try:
        # Retrieve the existing deployment to retain its etag for concurrency control
        deployment = client.get_deployment(name=deployment_name)
        deployment.oauth_scopes = [
            "https://www.googleapis.com/auth/calendar.addons.execute"
        ]

        response = client.replace_deployment(deployment=deployment)
        print(f"Replaced deployment: {response.name}")
    except google.api_core.exceptions.GoogleAPICallError as error:
        print(f"Failed to replace deployment: {error.message}")
# [END gsuiteaddons_v1_gsuiteaddons_replace_deployment]
