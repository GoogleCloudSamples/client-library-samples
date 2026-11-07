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

# [START translate_v3_translationservice_glossaryentry_get]
import google.api_core.exceptions
from google.cloud import translate_v3

client = translate_v3.TranslationServiceClient()


def get_glossary_entry(
    project_id: str,
    location_id: str,
    glossary_id: str,
    glossary_entry_id: str,
) -> None:
    """Retrieves a glossary entry from a glossary.

    Args:
        project_id: The Google Cloud project ID.
        location_id: The Google Cloud region where the glossary is located (for
          example, 'us-central1').
        glossary_id: The ID of the parent glossary containing the entry.
        glossary_entry_id: The ID of the glossary entry to retrieve.
    """
    name = (
        f"projects/{project_id}/locations/{location_id}/"
        f"glossaries/{glossary_id}/glossaryEntries/{glossary_entry_id}"
    )

    try:
        response = client.get_glossary_entry(name=name)
        print(f"Glossary entry name: {response.name}")
        if response.description:
            print(f"Description: {response.description}")
    except google.api_core.exceptions.GoogleAPICallError as error:
        print(f"API call failed: {error}")
# [END translate_v3_translationservice_glossaryentry_get]
