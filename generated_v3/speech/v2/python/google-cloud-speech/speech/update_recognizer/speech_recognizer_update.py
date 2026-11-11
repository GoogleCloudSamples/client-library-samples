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

# [START speech_v2_speech_recognizer_update]
import google.api_core.exceptions
from google.api_core.client_options import ClientOptions
from google.cloud import speech_v2
from google.protobuf import field_mask_pb2


def update_recognizer(project_id: str, location_id: str, recognizer_id: str) -> None:
    """Updates a Speech-to-Text recognizer.

    Args:
        project_id: The Google Cloud project ID (for example, 'example-project-id').
        location_id: The Google Cloud region where the service is located (for example, 'us-central1').
        recognizer_id: ID of the Recognizer (for example, 'example-recognizer-id').
    """
    api_endpoint = (
        f"{location_id}-speech.googleapis.com"
        if location_id != "global"
        else "speech.googleapis.com"
    )
    client = speech_v2.SpeechClient(
        client_options=ClientOptions(api_endpoint=api_endpoint)
    )

    recognizer = speech_v2.Recognizer(
        name=f"projects/{project_id}/locations/{location_id}/recognizers/{recognizer_id}",
        display_name="Updated Recognizer",
        model="latest_long",
        language_codes=["en-US"],
    )
    update_mask = field_mask_pb2.FieldMask(
        paths=["display_name", "model", "language_codes"]
    )
    request = speech_v2.UpdateRecognizerRequest(
        recognizer=recognizer,
        update_mask=update_mask,
    )

    try:
        operation = client.update_recognizer(request=request)
        response = operation.result()
        print(f"Updated recognizer: {response.name}")
    except google.api_core.exceptions.GoogleAPICallError as e:
        print(f"Failed to update recognizer: {e}")
# [END speech_v2_speech_recognizer_update]
