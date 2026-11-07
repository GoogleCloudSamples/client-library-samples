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

# [START speech_v2_speech_phraseset_get]
from google.api_core import exceptions
from google.api_core.client_options import ClientOptions
from google.cloud import speech_v2


def get_phrase_set(project_id: str, location_id: str, phrase_set_id: str) -> None:
    """Retrieves an existing PhraseSet resource.

    Args:
        project_id: The Google Cloud project ID (for example, 'example-project-id').
        location_id: The Google Cloud region or location where the PhraseSet is located (for example, 'global' or 'us-central1').
        phrase_set_id: The caller-specified ID of the PhraseSet to retrieve. Valid characters are lowercase letters, numbers, and hyphens (4-63 characters, for example, 'example-phrase-set').
    """
    # Speech-to-Text v2 requires regional endpoints for non-global locations
    api_endpoint = (
        f"{location_id}-speech.googleapis.com"
        if location_id != "global"
        else "speech.googleapis.com"
    )
    client = speech_v2.SpeechClient(
        client_options=ClientOptions(api_endpoint=api_endpoint)
    )

    name = f"projects/{project_id}/locations/{location_id}/phraseSets/{phrase_set_id}"

    request = speech_v2.GetPhraseSetRequest(
        name=name,
    )

    try:
        phrase_set = client.get_phrase_set(request=request)
        print(f"PhraseSet name: {phrase_set.name}")
    except exceptions.GoogleAPICallError as error:
        print(f"Failed to retrieve PhraseSet: {error}")
# [END speech_v2_speech_phraseset_get]
