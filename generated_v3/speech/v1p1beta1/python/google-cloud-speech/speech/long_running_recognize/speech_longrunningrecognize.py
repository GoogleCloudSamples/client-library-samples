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

# [START speech_v1p1beta1_speech_long_running_recognize]
import google.api_core.exceptions
from google.cloud import speech_v1p1beta1

client = speech_v1p1beta1.SpeechClient()


def long_running_recognize() -> None:
    """Transcribe long audio files asynchronously using a long-running operation."""
    config = speech_v1p1beta1.RecognitionConfig(
        encoding=speech_v1p1beta1.RecognitionConfig.AudioEncoding.FLAC,
        language_code="en-US",
    )
    audio = speech_v1p1beta1.RecognitionAudio(
        uri="gs://cloud-samples-data/speech/brooklyn_bridge.flac",
    )

    try:
        operation = client.long_running_recognize(config=config, audio=audio)
        print("Waiting for operation to complete...")
        response = operation.result(timeout=300)

        for result in response.results:
            alternative = result.alternatives[0]
            print(f"Transcript: {alternative.transcript}")
            print(f"Confidence: {alternative.confidence:.4f}")
    except google.api_core.exceptions.GoogleAPICallError as e:
        print(f"API call failed: {e}")
# [END speech_v1p1beta1_speech_long_running_recognize]
