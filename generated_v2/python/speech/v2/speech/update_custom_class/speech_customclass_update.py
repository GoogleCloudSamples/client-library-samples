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

# [START speech_v2_speech_customclass_update]
import google.api_core.exceptions
from google.cloud import speech_v2
from google.protobuf import field_mask_pb2

client = speech_v2.SpeechClient()


def update_custom_class(
    project_id: str, location_id: str, custom_class_id: str
) -> None:
    """Updates a CustomClass resource in Cloud Speech-to-Text.

    Args:
        project_id: The Google Cloud project ID (for example, 'example-project-id')
        location_id: The Google Cloud region where the service is located (for example, 'us-central1')
        custom_class_id: ID of the CustomClass (for example, 'example-customclass-id')
    """
    custom_class_name = (
        f"projects/{project_id}/locations/{location_id}/customClasses/{custom_class_id}"
    )

    custom_class = speech_v2.CustomClass(
        name=custom_class_name,
        items=[speech_v2.CustomClass.ClassItem(value="greeting")],
    )
    update_mask = field_mask_pb2.FieldMask(paths=["items"])

    request = speech_v2.UpdateCustomClassRequest(
        custom_class=custom_class,
        update_mask=update_mask,
    )

    try:
        operation = client.update_custom_class(request=request)
        response = operation.result()
        print(f"Updated CustomClass: {response.name}")
    except google.api_core.exceptions.GoogleAPICallError as e:
        print(f"Failed to update CustomClass: {e}")
# [END speech_v2_speech_customclass_update]
