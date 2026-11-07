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

# [START speech_v2_speech_customclasses_list]
import google.api_core.exceptions
from google.cloud import speech_v2

client = speech_v2.SpeechClient()


def list_custom_classes(project_id: str, location_id: str) -> None:
    """Lists custom classes in a given project and location.

    Args:
        project_id: The Google Cloud project ID.
        location_id: The Google Cloud region or location where CustomClasses
            reside (for example, 'global' or 'us-central1').
    """
    parent = f"projects/{project_id}/locations/{location_id}"

    request = speech_v2.ListCustomClassesRequest(
        parent=parent,
    )

    try:
        response = client.list_custom_classes(request=request)
        for custom_class in response:
            print(f"Custom class name: {custom_class.name}")
    except google.api_core.exceptions.GoogleAPICallError as error:
        print(f"API call failed: {error}")
# [END speech_v2_speech_customclasses_list]
