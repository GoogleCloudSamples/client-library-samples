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

# [START speech_v1p1beta1_adaptation_customclass_create]
import google.api_core.exceptions
from google.cloud import speech_v1p1beta1

client = speech_v1p1beta1.AdaptationClient()


def create_custom_class(project_id: str, location_id: str, custom_class_id: str) -> None:
    """Create a custom class for Speech-to-Text adaptation.

    Args:
        project_id: The Google Cloud project ID (for example, 'example-project-id').
        location_id: The Speech-to-Text location. Supported locations are 'global', 'us', and 'eu' (for example, 'global').
        custom_class_id: Caller-specified ID for the CustomClass (for example, 'example-custom-class'). Must be 4 to 63 characters containing letters, numbers, and hyphens.
    """
    parent = f"projects/{project_id}/locations/{location_id}"
    custom_class = speech_v1p1beta1.CustomClass(
        items=[
            speech_v1p1beta1.CustomClass.ClassItem(value="passenger_ship"),
            speech_v1p1beta1.CustomClass.ClassItem(value="cargo_ship"),
        ]
    )

    adaptation_client = (
        speech_v1p1beta1.AdaptationClient(
            client_options={"api_endpoint": f"{location_id}-speech.googleapis.com"}
        )
        if location_id != "global"
        else client
    )

    try:
        response = adaptation_client.create_custom_class(
            parent=parent,
            custom_class_id=custom_class_id,
            custom_class=custom_class,
        )
        print(f"Created custom class: {response.name}")
    except google.api_core.exceptions.GoogleAPICallError as error:
        print(f"Failed to create custom class: {error}")
# [END speech_v1p1beta1_adaptation_customclass_create]
