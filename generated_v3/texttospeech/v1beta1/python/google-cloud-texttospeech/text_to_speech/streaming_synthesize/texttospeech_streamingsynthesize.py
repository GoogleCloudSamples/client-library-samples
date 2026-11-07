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

# [START texttospeech_v1beta1_texttospeech_streaming_synthesize]
import os

from google.api_core.client_options import ClientOptions
import google.api_core.exceptions
import google.auth
from google.cloud import texttospeech_v1beta1


def streaming_synthesize() -> None:
    """Synthesize audio from text chunks using bidirectional streaming."""
    _, project_id = google.auth.default()
    if not project_id:
        project_id = os.environ.get("GOOGLE_CLOUD_PROJECT")

    client_options = (
        ClientOptions(quota_project_id=project_id) if project_id else None
    )
    client = texttospeech_v1beta1.TextToSpeechClient(client_options=client_options)

    # The first request must define configuration parameters using PCM encoding.
    config = texttospeech_v1beta1.StreamingSynthesizeConfig(
        voice=texttospeech_v1beta1.VoiceSelectionParams(
            language_code="en-US",
            name="en-US-Journey-F",
        ),
        streaming_audio_config=texttospeech_v1beta1.StreamingAudioConfig(
            audio_encoding=texttospeech_v1beta1.AudioEncoding.PCM,
        ),
    )

    # Subsequent requests deliver the text chunks for processing.
    requests = [
        texttospeech_v1beta1.StreamingSynthesizeRequest(streaming_config=config),
        texttospeech_v1beta1.StreamingSynthesizeRequest(
            input=texttospeech_v1beta1.StreamingSynthesisInput(
                text="Streaming synthesis delivers low-latency audio chunks."
            )
        ),
    ]

    try:
        responses = client.streaming_synthesize(requests=iter(requests))
        total_audio_bytes = 0
        for response in responses:
            total_audio_bytes += len(response.audio_content)

        print(f"Received {total_audio_bytes} bytes of synthesized audio.")
    except google.api_core.exceptions.GoogleAPICallError as e:
        print(f"Streaming synthesis request failed: {e.message}")


# [END texttospeech_v1beta1_texttospeech_streaming_synthesize]
