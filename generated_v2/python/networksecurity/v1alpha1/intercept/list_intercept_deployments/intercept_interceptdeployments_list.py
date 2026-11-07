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

# [START networksecurity_v1alpha1_intercept_interceptdeployments_list]
import google.api_core.exceptions
from google.cloud import network_security_v1alpha1


def list_intercept_deployments(project_id: str, location_id: str) -> None:
    """Lists intercept deployments in a specified project and location.

    Args:
        project_id: The ID of the Google Cloud project.
        location_id: The Google Cloud location (for example, 'us-central1-a') for
          the intercept deployments.
    """
    client = network_security_v1alpha1.InterceptClient()

    parent = f"projects/{project_id}/locations/{location_id}"

    request = network_security_v1alpha1.ListInterceptDeploymentsRequest(
        parent=parent,
    )

    try:
        page_result = client.list_intercept_deployments(request=request)
        for deployment in page_result:
            print(f"Deployment name: {deployment.name}")
    except google.api_core.exceptions.GoogleAPICallError as error:
        print(f"Error listing intercept deployments: {error}")


# [END networksecurity_v1alpha1_intercept_interceptdeployments_list]
