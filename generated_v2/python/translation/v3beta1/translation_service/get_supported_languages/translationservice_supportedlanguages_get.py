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

# [START translate_v3beta1_translationservice_supportedlanguages_get]
import google.api_core.exceptions
from google.cloud import translate_v3beta1

client = translate_v3beta1.TranslationServiceClient()


def get_supported_languages(project_id: str, location_id: str) -> None:
    """Lists languages supported by Translation API.

    Args:
        project_id: Google Cloud project ID (for example, 'example-project-id').
        location_id: Google Cloud region or 'global' (for example, 'global' or 'us-central1').
    """
    parent = f"projects/{project_id}/locations/{location_id}"

    request = translate_v3beta1.GetSupportedLanguagesRequest(
        parent=parent,
        display_language_code="en",
    )

    try:
        response = client.get_supported_languages(request=request)

        for language in response.languages:
            print(f"Language code: {language.language_code}")
            print(f"Display name: {language.display_name}")
            print(f"Supports source: {language.support_source}")
            print(f"Supports target: {language.support_target}")
    except google.api_core.exceptions.GoogleAPICallError as error:
        print(f"API call failed: {error}")
# [END translate_v3beta1_translationservice_supportedlanguages_get]
