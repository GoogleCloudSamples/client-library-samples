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

# [START speech_v2_speech_customclass_get]
from google.api_core.client_options import ClientOptions
import google.api_core.exceptions
from google.cloud import speech_v2


def get_custom_class(project_id: str, location_id: str, custom_class_id: str) -> None:
    """Retrieves a Speech-to-Text CustomClass resource.

    Args:
        project_id: The Google Cloud project ID (for example, 'example-project-id').
        location_id: The Google Cloud region where the service is located (for example, 'us-central1').
        custom_class_id: The ID of the CustomClass (for example, 'example-customclass-id').
    """
    client_options = None
    if location_id != "global":
        client_options = ClientOptions(
            api_endpoint=f"{location_id}-speech.googleapis.com"
        )

    client = speech_v2.SpeechClient(client_options=client_options)

    name = f"projects/{project_id}/locations/{location_id}/customClasses/{custom_class_id}"

    request = speech_v2.GetCustomClassRequest(
        name=name,
    )

    try:
        response = client.get_custom_class(request=request)
        print(f"Retrieved custom class: {response.name}")
    except google.api_core.exceptions.GoogleAPICallError as error:
        print(f"Failed to retrieve custom class: {error}")
# [END speech_v2_speech_customclass_get]
