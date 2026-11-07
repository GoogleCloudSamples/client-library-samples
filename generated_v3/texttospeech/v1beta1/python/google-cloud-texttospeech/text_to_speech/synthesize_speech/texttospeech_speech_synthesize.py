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

# [START texttospeech_v1beta1_texttospeech_synthesize_speech]
import google.api_core.exceptions
from google.cloud import texttospeech_v1beta1

client = texttospeech_v1beta1.TextToSpeechClient()


def synthesize_speech() -> None:
    """Synthesizes speech from text input."""
    voice = texttospeech_v1beta1.VoiceSelectionParams(
        language_code="en-US",
        ssml_gender=texttospeech_v1beta1.SsmlVoiceGender.NEUTRAL,
    )
    audio_config = texttospeech_v1beta1.AudioConfig(
        audio_encoding=texttospeech_v1beta1.AudioEncoding.MP3
    )
    input = texttospeech_v1beta1.SynthesisInput(text="Hello, world!")

    try:
        response = client.synthesize_speech(
            input=input,
            voice=voice,
            audio_config=audio_config,
        )
        print(f"Synthesized audio content size: {len(response.audio_content)} bytes")
    except google.api_core.exceptions.GoogleAPICallError as error:
        print(f"Synthesize speech request failed: {error}")


# [END texttospeech_v1beta1_texttospeech_synthesize_speech]
