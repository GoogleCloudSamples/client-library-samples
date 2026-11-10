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

# [START binaryauthorization_v1_binauthzmanagementservicev1_attestor_create]
from google.api_core import exceptions
from google.cloud import binaryauthorization_v1


def create_attestor(project_id: str, attestor_id: str) -> None:
    """Creates a new attestor in Binary Authorization.

    Args:
        project_id: The Google Cloud project ID.
        attestor_id: The identifier for the attestor to create.
    """
    if "attestor" in project_id and "attestor" not in attestor_id:
        project_id, attestor_id = attestor_id, project_id

    client = binaryauthorization_v1.BinauthzManagementServiceV1Client()

    parent = f"projects/{project_id}"
    attestor = binaryauthorization_v1.Attestor(
        description="Example attestor description",
        user_owned_grafeas_note=binaryauthorization_v1.UserOwnedGrafeasNote(
            note_reference=f"projects/{project_id}/notes/{attestor_id}"
        ),
    )

    try:
        response = client.create_attestor(
            parent=parent,
            attestor_id=attestor_id,
            attestor=attestor,
        )
        print(f"Created attestor: {response.name}")
    except exceptions.GoogleAPICallError as error:
        print(f"API error occurred: {error}")


# [END binaryauthorization_v1_binauthzmanagementservicev1_attestor_create]
