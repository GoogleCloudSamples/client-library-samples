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

# [START speech_v1_speech_recognize]
import google.api_core.exceptions
from google.cloud import speech_v1

client = speech_v1.SpeechClient()


def recognize() -> None:
    """Transcribes audio from a Cloud Storage file using synchronous speech recognition.

    Args:
    """
    audio = speech_v1.RecognitionAudio(
        uri="gs://cloud-samples-data/speech/brooklyn_bridge.flac"
    )
    config = speech_v1.RecognitionConfig(
        encoding=speech_v1.RecognitionConfig.AudioEncoding.FLAC,
        sample_rate_hertz=44100,
        language_code="en-US",
    )

    request = speech_v1.RecognizeRequest(
        config=config,
        audio=audio,
    )

    try:
        response = client.recognize(request=request)
        for result in response.results:
            best_alternative = result.alternatives[0]
            print(f"Transcript: {best_alternative.transcript}")
            print(f"Confidence: {best_alternative.confidence:.2f}")
    except google.api_core.exceptions.GoogleAPICallError as error:
        print(f"Speech recognition request failed: {error}")
# [END speech_v1_speech_recognize]
