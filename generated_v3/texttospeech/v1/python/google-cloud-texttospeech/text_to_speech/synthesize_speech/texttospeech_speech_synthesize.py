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

# [START texttospeech_synthesize_speech]
import os

from google.api_core import exceptions
from google.api_core import retry
from google.api_core.client_options import ClientOptions
import google.auth
import google.auth.exceptions
from google.cloud import texttospeech_v1


def synthesize_speech() -> None:
    """Synthesizes speech from text input."""
    project_id = os.getenv("GOOGLE_CLOUD_PROJECT") or os.getenv("GCLOUD_PROJECT")
    if not project_id:
        try:
            _, project_id = google.auth.default()
        except google.auth.exceptions.DefaultCredentialsError:
            project_id = None

    client_options = (
        ClientOptions(quota_project_id=project_id) if project_id else None
    )
    client = texttospeech_v1.TextToSpeechClient(client_options=client_options)

    input = texttospeech_v1.SynthesisInput(
        text="Hello from Google Cloud Text-to-Speech!"
    )
    voice = texttospeech_v1.VoiceSelectionParams(
        language_code="en-US",
        ssml_gender=texttospeech_v1.SsmlVoiceGender.NEUTRAL,
    )
    audio_config = texttospeech_v1.AudioConfig(
        audio_encoding=texttospeech_v1.AudioEncoding.MP3
    )

    retry_policy = retry.Retry(
        predicate=retry.if_exception_type(exceptions.PermissionDenied),
        initial=1.0,
        maximum=10.0,
        multiplier=2.0,
        deadline=60.0,
    )

    try:
        response = client.synthesize_speech(
            input=input,
            voice=voice,
            audio_config=audio_config,
            retry=retry_policy,
        )
        print(f"Audio content size: {len(response.audio_content)} bytes")
    except exceptions.PermissionDenied as error:
        print(f"Permission denied: {error}")
# [END texttospeech_synthesize_speech]
