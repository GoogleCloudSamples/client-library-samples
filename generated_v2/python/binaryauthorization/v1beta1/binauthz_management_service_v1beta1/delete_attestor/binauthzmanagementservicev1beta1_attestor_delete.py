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

# [START binaryauthorization_v1beta1_binauthzmanagementservicev1beta1_attestor_delete]
import google.api_core.exceptions
from google.cloud import binaryauthorization_v1beta1

client = binaryauthorization_v1beta1.BinauthzManagementServiceV1Beta1Client()


def delete_attestor(project_id: str, attestor_id: str) -> None:
    """Use the delete_attestor method

    Args:
        project_id: The Google Cloud project ID (for example, 'example-project-id')
        attestor_id: ID of the Attestor (for example, 'example-attestor-id')
    """
    name = f"projects/{project_id}/attestors/{attestor_id}"

    try:
        client.delete_attestor(name=name)
        print(f"Deleted attestor: {name}")
    except google.api_core.exceptions.NotFound:
        print(f"Attestor not found: {name}")
    except google.api_core.exceptions.GoogleAPICallError as error:
        print(f"Failed to delete attestor: {error}")
# [END binaryauthorization_v1beta1_binauthzmanagementservicev1beta1_attestor_delete]
