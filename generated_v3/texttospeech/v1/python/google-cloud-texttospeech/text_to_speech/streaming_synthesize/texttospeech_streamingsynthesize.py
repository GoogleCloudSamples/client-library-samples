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

# [START texttospeech_v1_texttospeech_streaming_synthesize]
import google.api_core.exceptions
from google.cloud import texttospeech_v1


def streaming_synthesize() -> None:
    """Synthesize audio from streaming text in real time."""
    client = texttospeech_v1.TextToSpeechClient()

    try:
        def request_generator():
            # Initial request specifies the voice and audio configuration
            yield texttospeech_v1.StreamingSynthesizeRequest(
                streaming_config=texttospeech_v1.StreamingSynthesizeConfig(
                    voice=texttospeech_v1.VoiceSelectionParams(
                        language_code="en-US",
                        name="en-US-Journey-F",
                    ),
                    streaming_audio_config=texttospeech_v1.StreamingAudioConfig(
                        audio_encoding=texttospeech_v1.AudioEncoding.PCM,
                    ),
                )
            )
            # Subsequent requests provide text chunks to synthesize
            yield texttospeech_v1.StreamingSynthesizeRequest(
                input=texttospeech_v1.StreamingSynthesisInput(
                    text="Streaming text to synthesize speech in real time."
                )
            )

        responses = client.streaming_synthesize(requests=request_generator())

        total_audio_bytes = 0
        for response in responses:
            total_audio_bytes += len(response.audio_content)

        print(f"Total audio bytes received: {total_audio_bytes}")
    except google.api_core.exceptions.GoogleAPICallError as exc:
        print(f"Streaming synthesis failed: {exc}")
# [END texttospeech_v1_texttospeech_streaming_synthesize]
