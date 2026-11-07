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

# [START speech_v2_speech_recognize]
import google.api_core.client_options
import google.api_core.exceptions
from google.cloud import speech_v2


def recognize(project_id: str, location_id: str, recognizer_id: str) -> None:
    """Performs synchronous speech recognition on an audio file.

    Args:
        project_id: The Google Cloud project ID (for example, 'example-project-id').
        location_id: The Google Cloud region where the service is located (for example, 'us-central1').
        recognizer_id: ID of the Recognizer (for example, 'example-recognizer-id').
    """
    client_options = None
    if location_id != "global":
        client_options = google.api_core.client_options.ClientOptions(
            api_endpoint=f"{location_id}-speech.googleapis.com"
        )
    client = speech_v2.SpeechClient(client_options=client_options)

    recognizer = f"projects/{project_id}/locations/{location_id}/recognizers/{recognizer_id}"

    request = speech_v2.RecognizeRequest(
        recognizer=recognizer,
        config=speech_v2.RecognitionConfig(
            auto_decoding_config=speech_v2.AutoDetectDecodingConfig(),
            language_codes=["en-US"],
            model="long",
        ),
        uri="gs://cloud-samples-data/speech/brooklyn_bridge.wav",
    )

    try:
        response = client.recognize(request=request)
        for result in response.results:
            for alternative in result.alternatives:
                print(f"Transcript: {alternative.transcript}")
                print(f"Confidence: {alternative.confidence}")
    except google.api_core.exceptions.GoogleAPICallError as e:
        print(f"Recognition failed with API error: {e}")
# [END speech_v2_speech_recognize]
