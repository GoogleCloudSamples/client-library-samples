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

# [START networksecurity_v1alpha1_mirroring_mirroringdeployments_list]
import google.api_core.exceptions
from google.cloud import network_security_v1alpha1


def list_mirroring_deployments(project_id: str, location_id: str) -> None:
    """Lists mirroring deployments in a specified location.

    Args:
        project_id: The Google Cloud project ID.
        location_id: The Google Cloud location ID, for example, 'us-central1-a'.
    """
    client = network_security_v1alpha1.MirroringClient()
    parent = f"projects/{project_id}/locations/{location_id}"

    request = network_security_v1alpha1.ListMirroringDeploymentsRequest(
        parent=parent,
    )

    try:
        page_result = client.list_mirroring_deployments(request=request)
        count = 0
        for deployment in page_result:
            print(f"Deployment name: {deployment.name}")
            print(f"Deployment state: {deployment.state}")
            count += 1
        if count == 0:
            print("No mirroring deployments found.")
    except google.api_core.exceptions.GoogleAPICallError as error:
        print(f"API call failed: {error}")
# [END networksecurity_v1alpha1_mirroring_mirroringdeployments_list]
