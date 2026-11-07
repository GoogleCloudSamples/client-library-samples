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

# [START speech_v2_speech_phraseset_create]
from google.api_core.client_options import ClientOptions
import google.api_core.exceptions
from google.cloud import speech_v2


def create_phrase_set(project_id: str, location_id: str, phrase_set_id: str) -> None:
    """Creates a phrase set in Speech-to-Text.

    Args:
        project_id: The Google Cloud project ID (for example, 'example-project-id').
        location_id: The Google Cloud region where the service is located (for example, 'us-central1' or 'global').
        phrase_set_id: The caller-chosen identifier for the PhraseSet to create.
    """
    if location_id != "global":
        client = speech_v2.SpeechClient(
            client_options=ClientOptions(
                api_endpoint=f"{location_id}-speech.googleapis.com"
            )
        )
    else:
        client = speech_v2.SpeechClient()

    parent = f"projects/{project_id}/locations/{location_id}"
    phrase_set = speech_v2.PhraseSet(
        phrases=[
            speech_v2.PhraseSet.Phrase(value="example phrase", boost=10.0),
        ],
        display_name="Example Phrase Set",
    )

    try:
        operation = client.create_phrase_set(
            request=speech_v2.CreatePhraseSetRequest(
                parent=parent,
                phrase_set_id=phrase_set_id,
                phrase_set=phrase_set,
            )
        )
        response = operation.result()
        print(f"Created phrase set: {response.name}")
    except google.api_core.exceptions.GoogleAPICallError as exc:
        print(f"Operation failed with error: {exc}")
# [END speech_v2_speech_phraseset_create]
