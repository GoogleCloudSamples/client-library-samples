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

# [START speech_v1p1beta1_adaptation_phraseset_create]
import google.api_core.exceptions
from google.cloud import speech_v1p1beta1

client = speech_v1p1beta1.AdaptationClient()


def create_phrase_set(project_id: str, location_id: str, phrase_set_id: str) -> None:
    """Creates a PhraseSet resource for speech adaptation.

    Args:
        project_id: The Google Cloud project ID (for example, 'example-project-id').
        location_id: The Google Cloud region where the service is located (for example, 'us-central1').
        phrase_set_id: ID of the PhraseSet (for example, 'example-phraseset-id').
    """
    parent = f"projects/{project_id}/locations/{location_id}"
    phrase_set = speech_v1p1beta1.PhraseSet(
        phrases=[
            speech_v1p1beta1.PhraseSet.Phrase(
                value="example-phrase",
                boost=10.0,
            )
        ]
    )

    try:
        response = client.create_phrase_set(
            parent=parent,
            phrase_set_id=phrase_set_id,
            phrase_set=phrase_set,
        )
        print(f"Created PhraseSet: {response.name}")
    except google.api_core.exceptions.GoogleAPICallError as error:
        print(f"Failed to create PhraseSet: {error}")
# [END speech_v1p1beta1_adaptation_phraseset_create]
