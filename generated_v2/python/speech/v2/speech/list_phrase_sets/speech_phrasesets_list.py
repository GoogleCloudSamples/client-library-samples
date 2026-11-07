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

# [START speech_v2_speech_phrasesets_list]
import google.api_core.exceptions
from google.cloud import speech_v2

client = speech_v2.SpeechClient()


def list_phrase_sets(project_id: str, location_id: str) -> None:
    """Use the list_phrase_sets method

    Args:
        project_id: The Google Cloud project ID (for example, 'example-project-id')
        location_id: The Google Cloud region where the service is located (for example, 'us-central1')
    """
    parent = f"projects/{project_id}/locations/{location_id}"

    request = speech_v2.ListPhraseSetsRequest(
        parent=parent,
    )

    try:
        response = client.list_phrase_sets(request=request)
        for phrase_set in response:
            print(f"Phrase set name: {phrase_set.name}")
    except google.api_core.exceptions.GoogleAPICallError as e:
        print(f"Google Cloud Speech API call failed: {e}")


# [END speech_v2_speech_phrasesets_list]
