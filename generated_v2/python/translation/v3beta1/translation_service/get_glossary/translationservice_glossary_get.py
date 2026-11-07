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

# [START translate_v3beta1_translationservice_glossary_get]
import google.api_core.exceptions
from google.cloud import translate_v3


def get_glossary(project_id: str, location_id: str, glossary_id: str) -> None:
    """Retrieve metadata for an existing glossary.

    Args:
        project_id: The Google Cloud project ID.
        location_id: The Google Cloud region where the glossary resides (for
          example, 'us-central1').
        glossary_id: The identifier of the glossary to retrieve.
    """
    client = translate_v3.TranslationServiceClient()
    name = f"projects/{project_id}/locations/{location_id}/glossaries/{glossary_id}"

    try:
        response = client.get_glossary(name=name)
        print(f"Glossary name: {response.name}")
        print(f"Entry count: {response.entry_count}")
    except google.api_core.exceptions.GoogleAPICallError as error:
        print(f"Failed to retrieve glossary: {error}")


# [END translate_v3beta1_translationservice_glossary_get]
