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

# [START speech_v2_speech_recognizer_get]
import google.api_core.exceptions
from google.cloud import speech_v2


def get_recognizer(project_id: str, location_id: str, recognizer_id: str) -> None:
    """Retrieves a Speech-to-Text recognizer resource.

    Args:
        project_id: The Google Cloud project ID (for example, 'example-project-id').
        location_id: The Google Cloud region or location where the Recognizer is hosted (for example, 'global' or 'us-central1').
        recognizer_id: The caller-specified identifier of the Recognizer (for example, 'example-recognizer').
    """
    if location_id != "global":
        api_endpoint = f"{location_id}-speech.googleapis.com"
        client = speech_v2.SpeechClient(
            client_options={"api_endpoint": api_endpoint}
        )
    else:
        client = speech_v2.SpeechClient()

    name = f"projects/{project_id}/locations/{location_id}/recognizers/{recognizer_id}"
    request = speech_v2.GetRecognizerRequest(name=name)

    try:
        response = client.get_recognizer(request=request)
        print(f"Recognizer name: {response.name}")
        print(f"Display name: {response.display_name}")
        print(f"Model: {response.model}")
    except google.api_core.exceptions.NotFound:
        print(f"Recognizer not found: {name}")
    except google.api_core.exceptions.GoogleAPICallError as error:
        print(f"Failed to retrieve recognizer: {error}")
# [END speech_v2_speech_recognizer_get]
