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

# [START speech_v2_speech_phraseset_delete]
import google.api_core.exceptions
from google.api_core.client_options import ClientOptions
from google.cloud import speech_v2


def delete_phrase_set(project_id: str, location_id: str, phrase_set_id: str) -> None:
    """Deletes a PhraseSet resource.

    Args:
        project_id: The Google Cloud project ID (for example, 'example-project-id').
        location_id: The Google Cloud region where the service is located (for example, 'us-central1').
        phrase_set_id: The ID of the PhraseSet (for example, 'example-phraseset-id').
    """
    client_options = (
        ClientOptions(api_endpoint=f"{location_id}-speech.googleapis.com")
        if location_id != "global"
        else None
    )
    client = speech_v2.SpeechClient(client_options=client_options)

    name = f"projects/{project_id}/locations/{location_id}/phraseSets/{phrase_set_id}"

    request = speech_v2.DeletePhraseSetRequest(
        name=name,
    )

    try:
        operation = client.delete_phrase_set(request=request)
        response = operation.result()
        print(f"Deleted phrase set: {response.name}")
    except google.api_core.exceptions.GoogleAPICallError as e:
        print(f"Failed to delete phrase set: {e}")
# [END speech_v2_speech_phraseset_delete]
