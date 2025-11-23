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

# [START retail_v2beta_generativequestionservice_generativequestionconfigs_list]
from google.api_core.exceptions import NotFound
from google.cloud import retail_v2beta


def list_generative_question_configs(
    project_id: str, location: str, catalog_id: str
) -> None:
    """Lists all generative question configurations for a given catalog.

    Args:
        project_id: The Google Cloud project ID.
        location: The location of the catalog (e.g., "global").
        catalog_id: The ID of the catalog (e.g., "default_catalog").
    """
    client = retail_v2beta.GenerativeQuestionServiceClient()

    # The parent catalog resource name.
    parent = client.catalog_path(project_id, location, catalog_id)

    request = retail_v2beta.ListGenerativeQuestionConfigsRequest(
        parent=parent,
    )

    try:
        response = client.list_generative_question_configs(request=request)

        if response.generative_question_configs:
            print("Generative Question Configurations:")
            for config in response.generative_question_configs:
                print(f"  Name: {config.name}")
                print(f"  Facet: {config.facet}")
                print(f"  Question: {config.question}")
                print(f"  Frequency: {config.frequency}")
                print("---")
        else:
            print("No generative question configurations found for this catalog.")

    except NotFound as e:
        print(
            f"Error: The specified catalog '{parent}' was not found. "
            f"Please ensure the project ID, location, and catalog ID are correct. Details: {e}"
        )
    except Exception as e:
        print(f"An unexpected error occurred: {e}")


# [END retail_v2beta_generativequestionservice_generativequestionconfigs_list]

if __name__ == "__main__":
    parser = argparse.ArgumentParser(
        description="Lists generative question configurations for a Retail catalog."
    )
    parser.add_argument(
        "--project_id", type=str, required=True, help="Your Google Cloud project ID."
    )
    parser.add_argument(
        "--location",
        type=str,
        default="global",
        help="The location of the catalog (e.g., 'global').",
    )
    parser.add_argument(
        "--catalog_id",
        type=str,
        default="default_catalog",
        help="The ID of the catalog (e.g., 'default_catalog').",
    )

    args = parser.parse_args()

    list_generative_question_configs(args.project_id, args.location, args.catalog_id)
