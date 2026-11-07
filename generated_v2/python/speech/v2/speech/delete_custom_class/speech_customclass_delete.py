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

# [START speech_v2_speech_customclass_delete]
from google.api_core.client_options import ClientOptions
import google.api_core.exceptions
from google.cloud import speech_v2


def delete_custom_class(
    project_id: str, location_id: str, custom_class_id: str
) -> None:
    """Deletes a custom class.

    Args:
        project_id: The Google Cloud project ID (for example, 'example-project-id').
        location_id: The Google Cloud region where the service is located (for example, 'us-central1').
        custom_class_id: ID of the CustomClass (for example, 'example-customclass-id').
    """
    api_endpoint = (
        f"{location_id}-speech.googleapis.com"
        if location_id != "global"
        else "speech.googleapis.com"
    )
    client = speech_v2.SpeechClient(
        client_options=ClientOptions(api_endpoint=api_endpoint)
    )

    name = f"projects/{project_id}/locations/{location_id}/customClasses/{custom_class_id}"

    request = speech_v2.DeleteCustomClassRequest(
        name=name,
    )

    try:
        operation = client.delete_custom_class(request=request)
        response = operation.result()
        print(f"Deleted custom class: {response.name}")
    except google.api_core.exceptions.GoogleAPICallError as error:
        print(f"Operation failed: {error}")
# [END speech_v2_speech_customclass_delete]
