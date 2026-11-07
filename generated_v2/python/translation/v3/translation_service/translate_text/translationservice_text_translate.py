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

# [START translate_v3_translationservice_translate_text]
import google.api_core.exceptions
from google.cloud import translate_v3

client = translate_v3.TranslationServiceClient()


def translate_text(project_number_or_id: str) -> None:
    """Translate text using TranslationService.

    Args:
        project_number_or_id: ID of the project (for example, 'example-project-id').
    """
    parent = f"projects/{project_number_or_id}"
    target_language_code = "es"
    contents = "Hello, world!"

    try:
        request = translate_v3.TranslateTextRequest(
            parent=parent,
            target_language_code=target_language_code,
            contents=[contents],
        )
        response = client.translate_text(request=request)

        for translation in response.translations:
            print(f"Translated text: {translation.translated_text}")
    except google.api_core.exceptions.GoogleAPICallError as e:
        print(f"API call failed: {e}")
# [END translate_v3_translationservice_translate_text]
