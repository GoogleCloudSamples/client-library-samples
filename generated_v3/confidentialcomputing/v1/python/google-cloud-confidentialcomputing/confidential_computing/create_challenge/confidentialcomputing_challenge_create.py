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

# [START confidentialcomputing_v1_confidentialcomputing_challenge_create]
import google.api_core.exceptions
from google.cloud import confidentialcomputing_v1

client = confidentialcomputing_v1.ConfidentialComputingClient()


def create_challenge(project_id: str, location_id: str) -> None:
    """Creates a challenge for attestation verification.

    Args:
        project_id: The Google Cloud project ID (for example, 'example-project-id')
        location_id: The Google Cloud region where the service is located (for example, 'us-central1')
    """
    parent = f"projects/{project_id}/locations/{location_id}"
    challenge = confidentialcomputing_v1.Challenge()

    try:
        response = client.create_challenge(
            parent=parent,
            challenge=challenge,
        )
        print(f"Created challenge: {response.name}")
    except google.api_core.exceptions.GoogleAPICallError as e:
        print(f"Failed to create challenge: {e}")
# [END confidentialcomputing_v1_confidentialcomputing_challenge_create]
