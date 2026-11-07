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

# [START speech_v2_speech_undelete_phrase_set]
import google.api_core.exceptions
from google.api_core.client_options import ClientOptions
from google.cloud import speech_v2


def undelete_phrase_set(
    project_id: str, location_id: str, phrase_set_id: str
) -> None:
    """Undelete a phrase set.

    Args:
        project_id: The Google Cloud project ID (for example,
            'example-project-id').
        location_id: The Google Cloud region where the service is located (for
            example, 'us-central1' or 'global').
        phrase_set_id: The ID of the PhraseSet to undelete (for example,
            'example-phraseset-id').
    """
    client_options = (
        ClientOptions(api_endpoint=f"{location_id}-speech.googleapis.com")
        if location_id != "global"
        else None
    )
    client = speech_v2.SpeechClient(client_options=client_options)

    name = f"projects/{project_id}/locations/{location_id}/phraseSets/{phrase_set_id}"

    request = speech_v2.UndeletePhraseSetRequest(
        name=name,
    )

    try:
        # UndeletePhraseSet initiates a long-running operation.
        operation = client.undelete_phrase_set(request=request)
        response = operation.result()
        print(f"Undeleted phrase set: {response.name}")
    except google.api_core.exceptions.GoogleAPICallError as exc:
        print(f"Failed to undelete phrase set: {exc}")
# [END speech_v2_speech_undelete_phrase_set]
