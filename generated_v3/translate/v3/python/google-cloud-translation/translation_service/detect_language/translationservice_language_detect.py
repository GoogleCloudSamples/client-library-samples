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

# [START translate_v3_translationservice_detect_language]
import google.api_core.exceptions
from google.cloud import translate_v3

client = translate_v3.TranslationServiceClient()


def detect_language(project_id: str, location_id: str, content: str) -> None:
    """Detects the language of a text string.

    Args:
        project_id: The Google Cloud project ID.
        location_id: The Google Cloud location ID (for example, 'global' or 'us-central1').
        content: The text content for language detection (for example, 'Hello, world!').
    """
    parent = f"projects/{project_id}/locations/{location_id}"

    request = translate_v3.DetectLanguageRequest(
        parent=parent,
        content=content,
        mime_type="text/plain",
    )

    try:
        response = client.detect_language(request=request)
        for language in response.languages:
            print(f"Detected language code: {language.language_code}")
            print(f"Confidence: {language.confidence}")
    except google.api_core.exceptions.GoogleAPICallError as error:
        print(f"API call failed: {error}")
# [END translate_v3_translationservice_detect_language]
