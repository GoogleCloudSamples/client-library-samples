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

# [START speech_v2_speech_recognizers_list]
from google.api_core import exceptions
from google.cloud import speech_v2


def list_recognizers(project_id: str, location_id: str) -> None:
    """Lists Speech-to-Text recognizers in a given location.

    Args:
        project_id: The Google Cloud project ID (for example, 'example-project-id')
        location_id: The Google Cloud region where the service is located (for example, 'us-central1')
    """
    if location_id == "global":
        client = speech_v2.SpeechClient()
    else:
        client = speech_v2.SpeechClient(
            client_options={"api_endpoint": f"{location_id}-speech.googleapis.com"}
        )

    parent = f"projects/{project_id}/locations/{location_id}"

    request = speech_v2.ListRecognizersRequest(
        parent=parent,
    )

    try:
        response = client.list_recognizers(request=request)

        for recognizer in response:
            print(f"Recognizer name: {recognizer.name}")
            print(f"Language codes: {recognizer.language_codes}")
            print(f"Model: {recognizer.model}")
    except exceptions.GoogleAPICallError as error:
        print(f"Failed to list recognizers: {error}")
# [END speech_v2_speech_recognizers_list]
