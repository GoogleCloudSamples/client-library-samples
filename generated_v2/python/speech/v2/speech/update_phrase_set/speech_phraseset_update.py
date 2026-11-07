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

# [START speech_v2_speech_phraseset_update]
import google.api_core.exceptions
from google.api_core.client_options import ClientOptions
from google.cloud import speech_v2
from google.protobuf import field_mask_pb2


def update_phrase_set(
    project_id: str, location_id: str, phrase_set_id: str
) -> None:
    """Updates a phrase set for speech recognition.

    Args:
        project_id: The Google Cloud project ID.
        location_id: The Google Cloud region where the service is located.
        phrase_set_id: The ID of the PhraseSet to update.
    """
    if location_id != "global":
        api_endpoint = f"{location_id}-speech.googleapis.com"
        client = speech_v2.SpeechClient(
            client_options=ClientOptions(api_endpoint=api_endpoint)
        )
    else:
        client = speech_v2.SpeechClient()

    phrase_set_name = client.phrase_set_path(
        project_id, location_id, phrase_set_id
    )

    phrase_set = speech_v2.PhraseSet(
        name=phrase_set_name,
        phrases=[
            speech_v2.PhraseSet.Phrase(
                value="unified communications",
                boost=12.5,
            )
        ],
    )
    update_mask = field_mask_pb2.FieldMask(paths=["phrases"])

    try:
        operation = client.update_phrase_set(
            phrase_set=phrase_set,
            update_mask=update_mask,
        )
        response = operation.result()
        print(f"Updated PhraseSet: {response.name}")
    except google.api_core.exceptions.GoogleAPICallError as error:
        print(f"Update failed with API error: {error}")
# [END speech_v2_speech_phraseset_update]
