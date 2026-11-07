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

# [START texttospeech_v1_texttospeech_voices_list]
import google.api_core.exceptions
from google.cloud import texttospeech_v1

client = texttospeech_v1.TextToSpeechClient()


def list_voices(language_code: str) -> None:
    """Lists voices available for synthesis using the Text-to-Speech API.

    Args:
        language_code: BCP-47 language tag (for example, 'en-US'). If specified,
          only voices supporting this language are returned. Pass an empty
          string to retrieve all voices.
    """
    try:
        request = texttospeech_v1.ListVoicesRequest(
            language_code=language_code if language_code else None
        )
        response = client.list_voices(request=request)

        for voice in response.voices:
            languages = ", ".join(voice.language_codes)
            gender = texttospeech_v1.SsmlVoiceGender(voice.ssml_gender).name
            print(
                f"Name: {voice.name} | Languages: {languages} | "
                f"Gender: {gender} | Rate: {voice.natural_sample_rate_hertz} Hz"
            )
    except google.api_core.exceptions.GoogleAPICallError as e:
        print(f"API call failed: {e}")
# [END texttospeech_v1_texttospeech_voices_list]
