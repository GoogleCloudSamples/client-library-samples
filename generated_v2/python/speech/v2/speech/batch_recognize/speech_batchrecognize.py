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

# [START speech_v2_speech_batch_recognize]
import google.api_core.exceptions
from google.cloud import speech_v2


def batch_recognize(project_id: str, location_id: str, recognizer_id: str) -> None:
    """Transcribe audio files using batch recognition.

    Args:
        project_id: The Google Cloud project ID (for example, 'example-project-id').
        location_id: The Google Cloud region where the service is located (for example, 'us-central1').
        recognizer_id: The caller-chosen ID of the Recognizer (for example, 'example-recognizer'), or '_' to use the implicit default Recognizer.
    """
    client_options = None
    if location_id != "global":
        client_options = {"api_endpoint": f"{location_id}-speech.googleapis.com"}

    client = speech_v2.SpeechClient(client_options=client_options)

    recognizer = f"projects/{project_id}/locations/{location_id}/recognizers/{recognizer_id}"

    file_metadata = speech_v2.BatchRecognizeFileMetadata(
        uri="gs://example-bucket/example-audio.wav"
    )
    output_config = speech_v2.RecognitionOutputConfig(
        inline_response_config=speech_v2.InlineOutputConfig()
    )
    request = speech_v2.BatchRecognizeRequest(
        recognizer=recognizer,
        files=[file_metadata],
        recognition_output_config=output_config,
    )

    try:
        operation = client.batch_recognize(request=request)
        response = operation.result()
        for uri, file_result in response.results.items():
            print(f"File: {uri}")
            if not file_result.inline_result:
                continue
            for result in file_result.inline_result.transcript.results:
                print(f"Transcript: {result.alternatives[0].transcript}")
    except google.api_core.exceptions.GoogleAPICallError as e:
        print(f"API call failed: {e}")
# [END speech_v2_speech_batch_recognize]
