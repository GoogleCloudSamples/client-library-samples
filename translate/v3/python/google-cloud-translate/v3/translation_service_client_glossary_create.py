# Copyright 2025 Google LLC
#
# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at
#
#     https://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.

import argparse

# [START translate_v3_create_glossary]
from google.cloud import translate_v3 as translate
from google.api_core.exceptions import Conflict, GoogleAPICallError


def create_glossary(
    project_id: str,
    location: str,
    input_uri: str,
    glossary_id: str,
    source_language_code: str,
    target_language_code: str,
) -> None:
    """Create an equivalent term sets glossary.

    Glossaries can be words or short phrases (usually fewer than five words).
    More info here: https://cloud.google.com/translate/docs/advanced/glossary#format-glossary

    Args:
        project_id: The Google Cloud project ID.
        location: The geographic location of the glossary (e.g., "us-central1").
            Glossaries are regional resources.
        input_uri: The Cloud Storage URI of the glossary file
            (e.g., "gs://cloud-samples-data/translation/glossary.csv").
            The CSV file should contain two columns: source term and target term.
        glossary_id: The ID of the glossary to create. This must be unique within the project and location.
            Example: "my-glossary-12345"
        source_language_code: The source language code for the glossary.
            Supported language codes can be found at
            https://cloud.google.com/translate/docs/languages. Example: "en"
        target_language_code: The target language code for the glossary.
            Supported language codes can be found at
            https://cloud.google.com/translate/docs/languages. Example: "es"
    """
    client = translate.TranslationServiceClient()

    # Construct the full glossary name.
    # The glossary ID must be unique within the project and location.
    glossary_name = client.glossary_path(project_id, location, glossary_id)

    # Define the language codes for the glossary.
    # For a bidirectional glossary (equivalent term sets), use LanguageCodesSet.
    # For a unidirectional glossary (source-target pairs), use LanguageCodePair.
    # This example uses LanguageCodePair, assuming a two-column CSV input.
    language_pair = translate.v3.Glossary.LanguageCodePair(
        source_language_code=source_language_code,
        target_language_code=target_language_code,
    )

    # Specify the GCS source for the glossary data.
    gcs_source = translate.v3.GcsSource(input_uri=input_uri)

    # Create the input configuration for the glossary.
    input_config = translate.v3.GlossaryInputConfig(gcs_source=gcs_source)

    # Build the glossary object.
    glossary = translate.v3.Glossary(
        name=glossary_name,
        language_pair=language_pair,
        input_config=input_config,
    )

    # The parent for the glossary creation request.
    # This specifies the project and location where the glossary will be created.
    parent = f"projects/{project_id}/locations/{location}"

    print(f"Creating glossary: {glossary_id} in {location}...")

    try:
        # Create the glossary. This is a long-running operation.
        operation = client.create_glossary(parent=parent, glossary=glossary)

        # Wait for the operation to complete.
        # The result() method blocks until the operation is done.
        result = operation.result()

        print(f"Created glossary: {result.name}")
        print(f"Input URI: {result.input_config.gcs_source.input_uri}")
        print(f"Source language: {source_language_code}")
        print(f"Target language: {target_language_code}")

    except Conflict as e:
        print(f"Error: Glossary '{glossary_id}' already exists in location '{location}'.")
        print(f"Details: {e}")
        print("Please choose a different glossary ID or delete the existing one.")
    except GoogleAPICallError as e:
        print(f"An API error occurred: {e}")
        # For other types of GoogleAPICallError, log the full error for debugging.
        # In a real application, you might want more specific handling based on error codes.
    except Exception as e:
        print(f"An unexpected error occurred: {e}")


# [END translate_v3_create_glossary]

if __name__ == "__main__":
    parser = argparse.ArgumentParser(
        description="Create a Google Cloud Translation glossary."
    )
    parser.add_argument(
        "project_id",
        help="Your Google Cloud project ID."
    )
    parser.add_argument(
        "location",
        help="The geographic location of the glossary (e.g., 'us-central1'). "
        "Glossaries are regional resources."
    )
    parser.add_argument(
        "input_uri",
        help="The Cloud Storage URI of the glossary file "
        "(e.g., 'gs://cloud-samples-data/translation/glossary.csv'). "
        "The CSV file should contain two columns: source term and target term."
    )
    parser.add_argument(
        "glossary_id",
        help="The ID of the glossary to create. This must be unique within the project and location. "
        "Example: 'my-unique-glossary-123'"
    )
    parser.add_argument(
        "source_language_code",
        help="The source language code for the glossary. "
        "Supported language codes can be found at "
        "https://cloud.google.com/translate/docs/languages. Example: 'en'"
    )
    parser.add_argument(
        "target_language_code",
        help="The target language code for the glossary. "
        "Supported language codes can be found at "
        "https://cloud.google.com/translate/docs/languages. Example: 'es'"
    )

    args = parser.parse_args()

    create_glossary(
        args.project_id,
        args.location,
        args.input_uri,
        args.glossary_id,
        args.source_language_code,
        args.target_language_code,
    )
