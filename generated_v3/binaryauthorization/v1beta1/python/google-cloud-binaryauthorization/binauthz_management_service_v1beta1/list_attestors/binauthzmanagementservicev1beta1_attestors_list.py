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

# [START binaryauthorization_v1beta1_binauthzmanagementservicev1beta1_attestors_list]
import google.api_core.exceptions
from google.cloud import binaryauthorization_v1beta1

client = binaryauthorization_v1beta1.BinauthzManagementServiceV1Beta1Client()


def list_attestors(project_id: str) -> None:
    """Lists attestors in a project.

    Args:
        project_id: The Google Cloud project ID (for example, 'example-project-id').
    """
    parent = f"projects/{project_id}"

    try:
        attestors = client.list_attestors(parent=parent)
        for attestor in attestors:
            print(f"Attestor name: {attestor.name}")
    except google.api_core.exceptions.GoogleAPICallError as error:
        print(f"Failed to list attestors: {error}")
# [END binaryauthorization_v1beta1_binauthzmanagementservicev1beta1_attestors_list]
