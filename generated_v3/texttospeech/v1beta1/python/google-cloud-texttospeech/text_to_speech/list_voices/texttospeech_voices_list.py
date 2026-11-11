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

# [START texttospeech_v1beta1_texttospeech_voices_list]
import google.api_core.exceptions
from google.cloud import texttospeech_v1beta1

client = texttospeech_v1beta1.TextToSpeechClient()


def list_voices(language_code: str) -> None:
    """Use the list_voices method

    Args:
        language_code: Optional BCP-47 language tag, such as 'en-US', used to filter the list of supported voices. If empty or omitted, voices for all supported languages are returned.
    """
    request = texttospeech_v1beta1.ListVoicesRequest(
        language_code=language_code,
    )

    try:
        response = client.list_voices(request=request)
        for voice in response.voices:
            language_codes = ", ".join(voice.language_codes)
            gender = texttospeech_v1beta1.SsmlVoiceGender(voice.ssml_gender).name
            print(
                f"Voice: {voice.name} | Languages: {language_codes} | "
                f"Gender: {gender} | Rate: {voice.natural_sample_rate_hertz} Hz"
            )
    except google.api_core.exceptions.GoogleAPICallError as e:
        print(f"API call failed: {e}")
# [END texttospeech_v1beta1_texttospeech_voices_list]
