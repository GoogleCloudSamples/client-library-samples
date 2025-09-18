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
import logging

# [START translate_v3beta1_translationservice_glossary_create]
from google.cloud import translate_v3beta1 as translate
from google.api_core.exceptions import AlreadyExists, GoogleAPICallError

def create_glossary(
    project_id: str,
    location: str,
    glossary_id: str,
    input_uri: str,
    source_language_code: str,
    target_language_code: str,
) -> None:
    """Creates a glossary for use with the Translation API.

    A glossary is a custom dictionary that the Translation API uses to translate
    domain-specific terminology consistently. This sample demonstrates creating
    a bidirectional glossary from a CSV file stored in Google Cloud Storage.

    Args:
        project_id: The Google Cloud project ID.
        location: The geographic location of the glossary (e.g., "us-central1").
                  Glossaries are regional resources.
        glossary_id: The ID for the glossary to create. This must be unique
                     within the project and location.
        input_uri: The Cloud Storage URI of the glossary file
                   (e.g., "gs://my-bucket/my-glossary.csv").
                   The file should be a CSV with two columns: source term, target term.
                   For example: "hello,hola".
        source_language_code: The BCP-47 language code of the source language
                              (e.g., "en").
        target_language_code: The BCP-47 language code of the target language
                              (e.g., "es").
    """
    client = translate.TranslationServiceClient()

    # Construct the full glossary name.
    # Note: Glossary names are in the format
    # projects/{project-number-or-id}/locations/{location-id}/glossaries/{glossary-id}
    glossary_name = client.glossary_path(
        project_id, location, glossary_id
    )

    # Define the language codes for the glossary.
    # For a bidirectional glossary, include both source and target languages.
    language_codes_set = translate.types.Glossary.LanguageCodesSet(
        language_codes=[source_language_code, target_language_code]
    )

    # Specify the GCS source for the glossary data.
    gcs_source = translate.types.GcsSource(input_uri=input_uri)

    # Configure the input for the glossary.
    input_config = translate.types.GlossaryInputConfig(gcs_source=gcs_source)

    # Create the glossary object.
    glossary = translate.types.Glossary(
        name=glossary_name,
        language_codes_set=language_codes_set,
        input_config=input_config,
    )

    # Define the parent resource for the glossary.
    parent = f"projects/{project_id}/locations/{location}"

    print(f"Creating glossary: {glossary_id} in {location}...")

    try:
        # Send the request and wait for the operation to complete.
        operation = client.create_glossary(parent=parent, glossary=glossary)
        result = operation.result()

        print(f"Created glossary: {result.name}")
        print(f"Input URI: {result.input_config.gcs_source.input_uri}")
        print(f"Language codes: {result.language_codes_set.language_codes}")
        print(f"Entry count: {result.entry_count}")

    except AlreadyExists as e:
        print(f"Glossary '{glossary_id}' already exists in project '{project_id}' and location '{location}'.")
        print(f"Error details: {e}")
        # Developers might want to fetch the existing glossary here or log a warning.
    except GoogleAPICallError as e:
        print(f"An API error occurred: {e}")
        # Log the full exception for debugging in a real application.
        logging.exception("Failed to create glossary due to API error.")
    except Exception as e:
        print(f"An unexpected error occurred: {e}")
        logging.exception("An unexpected error occurred during glossary creation.")

# [END translate_v3beta1_translationservice_glossary_create]

if __name__ == "__main__":
    logging.basicConfig(level=logging.INFO)
    parser = argparse.ArgumentParser(
        description="Creates a glossary for the Translation API."
    )
    parser.add_argument(
        "project_id",
        help="Your Google Cloud project ID.",
    )
    parser.add_argument(
        "--location",
        default="us-central1",
        help="The geographic location of the glossary (e.g., 'us-central1').",
    )
    parser.add_argument(
        "--glossary_id",
        default="my-sample-glossary",
        help="The ID for the glossary to create. Must be unique within the project and location.",
    )
    parser.add_argument(
        "--input_uri",
        default="gs://cloud-samples-data/translation/glossary.csv",
        help="The Cloud Storage URI of the glossary file (e.g., 'gs://my-bucket/my-glossary.csv'). "
             "The file should be a CSV with two columns: source term, target term (e.g., 'hello,hola').",
    )
    parser.add_argument(
        "--source_language_code",
        default="en",
        help="The BCP-47 language code of the source language (e.g., 'en').",
    )
    parser.add_argument(
        "--target_language_code",
        default="es",
        help="The BCP-47 language code of the target language (e.g., 'es').",
    )

    args = parser.parse_args()

    create_glossary(
        args.project_id,
        args.location,
        args.glossary_id,
        args.input_uri,
        args.source_language_code,
        args.target_language_code,
    )
