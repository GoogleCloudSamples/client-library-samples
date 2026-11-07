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

# [START binaryauthorization_v1beta1_binauthzmanagementservicev1beta1_attestor_update]
import google.api_core.exceptions
from google.cloud import binaryauthorization_v1beta1


def update_attestor(project_id: str, attestor_id: str) -> None:
    """Updates an existing attestor in Binary Authorization.

    Args:
        project_id: The Google Cloud project ID (for example, 'example-project-id').
        attestor_id: The ID of the attestor (for example, 'example-attestor-id').
    """
    client = binaryauthorization_v1beta1.BinauthzManagementServiceV1Beta1Client()
    attestor_name = f"projects/{project_id}/attestors/{attestor_id}"

    try:
        # Retrieve the existing attestor to preserve required configuration (such as attestor type)
        attestor = client.get_attestor(name=attestor_name)
        attestor.description = "Updated description for Binary Authorization attestor."

        response = client.update_attestor(attestor=attestor)
        print(f"Updated attestor: {response.name}")
    except google.api_core.exceptions.GoogleAPICallError as e:
        print(f"Failed to update attestor: {e}")
# [END binaryauthorization_v1beta1_binauthzmanagementservicev1beta1_attestor_update]
