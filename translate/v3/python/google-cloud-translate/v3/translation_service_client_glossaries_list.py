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

# [START translate_v3_translationservice_glossaries_list]
from google.api_core.exceptions import NotFound
from google.cloud import translate_v3 as translate

def list_glossaries_sample(
    project_id: str,
    location: str,
) -> None:
    """
    Lists all glossaries available in a given project and location.

    Args:
        project_id: The Google Cloud project ID.
        location: The location of the glossaries (e.g., "us-central1").
    """
    client = translate.TranslationServiceClient()

    # The `parent` specifies the project and location for which to list glossaries.
    # It has the format `projects/{project_id}/locations/{location}`.
    # For glossaries, the location must be a specific region (e.g., "us-central1"),
    # not "global".
    parent = client.location_path(project_id, location)

    try:
        # API call to list glossaries.
        # The `list_glossaries` method returns an iterable pager object,
        # allowing you to easily iterate through all glossaries even if they span multiple pages.
        glossaries = client.list_glossaries(parent=parent)

        print(f"Glossaries in project {project_id} at location {location}:")
        found_glossaries = False
        for glossary in glossaries:
            found_glossaries = True
            print(f"  Glossary Name: {glossary.name}")
            print(f"    Display Name: {glossary.display_name}")
            if glossary.language_pair:
                print(f"    Source Language: {glossary.language_pair.source_language_code}")
                print(f"    Target Language: {glossary.language_pair.target_language_code}")
            elif glossary.language_codes_set:
                print(f"    Languages: {', '.join(glossary.language_codes_set.language_codes)}")
            print(f"    Input URI: {glossary.input_config.gcs_source.input_uri}")
            print(f"    Entry Count: {glossary.entry_count}")
            print(f"    Submit Time: {glossary.submit_time}")
            print(f"    End Time: {glossary.end_time}")
            print("\n")

        if not found_glossaries:
            print("  No glossaries found.")

    except NotFound:
        # Handle the case where the specified project or location does not exist
        # or has no glossaries. This specific error indicates the resource was not found.
        print(f"Error: Project '{project_id}' or location '{location}' not found or no glossaries exist there.")
    except Exception as e:
        # Catch any other potential API errors and print a user-friendly message.
        print(f"An error occurred: {e}")

# [END translate_v3_translationservice_glossaries_list]

if __name__ == "__main__":
    parser = argparse.ArgumentParser(
        description="List glossaries in a Google Cloud project and location."
    )
    parser.add_argument(
        "--project_id",
        type=str,
        default="YOUR_PROJECT_ID",
        help="Your Google Cloud project ID.",
    )
    parser.add_argument(
        "--location",
        type=str,
        default="us-central1",
        help="The location of the glossaries (e.g., 'us-central1').",
    )
    args = parser.parse_args()

    list_glossaries_sample(args.project_id, args.location)
