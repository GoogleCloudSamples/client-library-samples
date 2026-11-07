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

# [START texttospeech_v1_texttospeechlongaudiosynthesize_synthesize_long_audio]
import google.api_core.exceptions
from google.cloud import texttospeech_v1

client = texttospeech_v1.TextToSpeechLongAudioSynthesizeClient()


def synthesize_long_audio(
    project_id: str, location_id: str, output_gcs_uri: str
) -> None:
    """Use the synthesize_long_audio method.

    Args:
        project_id: The Google Cloud project ID.
        location_id: The Google Cloud region, for example 'us-central1'.
        output_gcs_uri: Cloud Storage URI where synthesis results will be written,
            in the format 'gs://bucket_name/object_name'. The bucket must already exist.
    """
    parent = f"projects/{project_id}/locations/{location_id}"
    input = texttospeech_v1.SynthesisInput(
        text="Hello, world! This is a long audio synthesis sample."
    )
    voice = texttospeech_v1.VoiceSelectionParams(
        language_code="en-US",
        name="en-US-Standard-A",
        ssml_gender=texttospeech_v1.SsmlVoiceGender.FEMALE,
    )
    audio_config = texttospeech_v1.AudioConfig(
        audio_encoding=texttospeech_v1.AudioEncoding.LINEAR16,
    )

    request = texttospeech_v1.SynthesizeLongAudioRequest(
        parent=parent,
        input=input,
        voice=voice,
        audio_config=audio_config,
        output_gcs_uri=output_gcs_uri,
    )

    try:
        operation = client.synthesize_long_audio(request=request)
        response = operation.result()
        print(f"Finished long audio synthesis: {response}")
        print(f"Audio content written to {output_gcs_uri}")
    except google.api_core.exceptions.GoogleAPICallError as error:
        print(f"Synthesis operation failed: {error}")


# [END texttospeech_v1_texttospeechlongaudiosynthesize_synthesize_long_audio]
