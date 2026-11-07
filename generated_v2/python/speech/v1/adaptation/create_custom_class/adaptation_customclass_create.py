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

# [START speech_v1_adaptation_customclass_create]
import google.api_core.exceptions
from google.cloud import speech_v1


def create_custom_class(
    project_id: str, location_id: str, custom_class_id: str
) -> None:
    """Creates a custom class for Speech-to-Text adaptation.

    Args:
        project_id: The Google Cloud project ID (for example,
            'example-project-id').
        location_id: The Google Cloud location where the service is located (for
            example, 'global', 'us', or 'eu').
        custom_class_id: The ID to use for the custom class, 4-63 characters,
            restricting to letters, numbers, and hyphens, starting with a letter
            and ending with a letter or number (for example,
            'example-custom-class-1').
    """
    client = speech_v1.AdaptationClient()

    parent = f"projects/{project_id}/locations/{location_id}"
    custom_class = speech_v1.CustomClass(
        items=[
            speech_v1.CustomClass.ClassItem(value="example-item-1"),
            speech_v1.CustomClass.ClassItem(value="example-item-2"),
        ]
    )

    try:
        response = client.create_custom_class(
            parent=parent,
            custom_class_id=custom_class_id,
            custom_class=custom_class,
        )
        print(f"Created custom class: {response.name}")
    except google.api_core.exceptions.GoogleAPICallError as e:
        print(f"Failed to create custom class: {e}")
# [END speech_v1_adaptation_customclass_create]
