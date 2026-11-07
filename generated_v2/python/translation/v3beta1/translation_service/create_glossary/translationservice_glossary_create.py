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

# [START translate_v3beta1_translationservice_glossary_create]
import google.api_core.exceptions
from google.cloud import translate_v3beta1

client = translate_v3beta1.TranslationServiceClient()


def create_glossary(project_id: str, location_id: str, glossary_id: str) -> None:
    """Use the create_glossary method

    Args:
        project_id: The Google Cloud project ID.
        location_id: The Google Cloud location ID (e.g., 'us-central1'). Custom glossaries require a regional location.
        glossary_id: The caller-specified ID of the glossary to create.
    """
    parent = f"projects/{project_id}/locations/{location_id}"
    glossary_name = f"{parent}/glossaries/{glossary_id}"

    language_pair = translate_v3beta1.Glossary.LanguageCodePair(
        source_language_code="en",
        target_language_code="ja",
    )
    gcs_source = translate_v3beta1.GcsSource(
        input_uri="gs://cloud-samples-data/translation/glossary.csv"
    )
    input_config = translate_v3beta1.GlossaryInputConfig(gcs_source=gcs_source)

    glossary = translate_v3beta1.Glossary(
        name=glossary_name,
        language_pair=language_pair,
        input_config=input_config,
    )

    try:
        operation = client.create_glossary(parent=parent, glossary=glossary)
        print("Waiting for operation to complete...")
        response = operation.result()
        print(f"Created glossary: {response.name}")
        print(f"Entry count: {response.entry_count}")
    except google.api_core.exceptions.GoogleAPICallError as e:
        print(f"Failed to create glossary: {e}")
# [END translate_v3beta1_translationservice_glossary_create]
