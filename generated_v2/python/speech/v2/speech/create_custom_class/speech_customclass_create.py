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

# [START speech_v2_speech_customclass_create]
import google.api_core.exceptions
from google.cloud import speech_v2


def create_custom_class(
    project_id: str, location_id: str, custom_class_id: str
) -> None:
    """Create a custom class resource.

    Args:
        project_id: The Google Cloud project ID (for example, 'example-project-id').
        location_id: The Google Cloud region where the service is located (for example, 'us-central1').
        custom_class_id: The ID to use for the CustomClass, which becomes the final component of the CustomClass resource name.
    """
    if location_id != "global":
        api_endpoint = f"{location_id}-speech.googleapis.com"
        client = speech_v2.SpeechClient(
            client_options={"api_endpoint": api_endpoint}
        )
    else:
        client = speech_v2.SpeechClient()

    custom_class = speech_v2.CustomClass(
        display_name="Example Custom Class",
        items=[
            speech_v2.CustomClass.ClassItem(value="red"),
            speech_v2.CustomClass.ClassItem(value="green"),
            speech_v2.CustomClass.ClassItem(value="blue"),
        ],
    )
    parent = f"projects/{project_id}/locations/{location_id}"

    request = speech_v2.CreateCustomClassRequest(
        parent=parent,
        custom_class=custom_class,
        custom_class_id=custom_class_id,
    )

    try:
        operation = client.create_custom_class(request=request)
        response = operation.result()
        print(f"Created custom class: {response.name}")
    except google.api_core.exceptions.GoogleAPICallError as e:
        print(f"Operation failed with error: {e}")
# [END speech_v2_speech_customclass_create]
