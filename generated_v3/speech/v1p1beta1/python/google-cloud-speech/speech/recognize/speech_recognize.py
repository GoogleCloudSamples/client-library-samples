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

# [START speech_v1p1beta1_speech_recognize]
import google.api_core.exceptions
from google.cloud import speech_v1p1beta1

client = speech_v1p1beta1.SpeechClient()


def recognize() -> None:
    """Synchronously transcribe audio from a Cloud Storage bucket."""
    config = speech_v1p1beta1.RecognitionConfig(
        encoding=speech_v1p1beta1.RecognitionConfig.AudioEncoding.FLAC,
        language_code="en-US",
    )
    audio = speech_v1p1beta1.RecognitionAudio(
        uri="gs://cloud-samples-data/speech/brooklyn_bridge.flac",
    )

    try:
        response = client.recognize(config=config, audio=audio)

        for result in response.results:
            best_alternative = result.alternatives[0]
            print(f"Transcript: {best_alternative.transcript}")
            print(f"Confidence: {best_alternative.confidence:.2f}")
    except google.api_core.exceptions.GoogleAPICallError as error:
        print(f"Request failed: {error}")
# [END speech_v1p1beta1_speech_recognize]
