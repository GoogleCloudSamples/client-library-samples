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

# [START retail_v2alpha_generativequestionservice_generativequestionconfigs_list]
from google.api_core import exceptions
from google.cloud import retail_v2alpha


def list_generative_question_configs(
    project_id: str,
    location: str,
) -> None:
    """
    Lists all generative question configurations for a given catalog.

    This method retrieves the configurations for all automatically generated questions
    associated with a specific product catalog in Google Cloud Retail. These configurations
    control how the generative AI feature behaves for different aspects of the catalog.

    Args:
        project_id: The Google Cloud project ID.
        location: The Google Cloud location (e.g., "global").
    """
    client = retail_v2alpha.GenerativeQuestionServiceClient()

    parent = client.catalog_path(project_id, location, "default_catalog")

    try:
        request = retail_v2alpha.ListGenerativeQuestionConfigsRequest(parent=parent)
        response = client.list_generative_question_configs(request=request)

        if response.generative_question_configs:
            for config in response.generative_question_configs:
                print(f"  Generative Question Config Name: {config.name}")
                print(f"  Catalog: {config.catalog}")
                print(f"  Facet: {config.facet}")
                print(f"  Question: {config.question}")
                print(f"  Frequency: {config.frequency}")
                print("---")
        else:
            print(f"No generative question configurations found for catalog: {parent}")

    except exceptions.NotFound as e:
        print(f"Error: The specified catalog or its parent was not found: {e}")
        print(
            "Please ensure the project ID and location are correct and the catalog exists."
        )
    except Exception as e:
        print(f"An unexpected error occurred: {e}")


# [END retail_v2alpha_generativequestionservice_generativequestionconfigs_list]

if __name__ == "__main__":
    parser = argparse.ArgumentParser(
        description="Lists generative question configurations for a catalog."
    )
    parser.add_argument(
        "--project_id",
        type=str,
        required=True,
        help="Your Google Cloud project ID.",
    )
    parser.add_argument(
        "--location",
        type=str,
        default="global",
        help="The Google Cloud location (e.g., 'us-central1').",
    )

    args = parser.parse_args()

    list_generative_question_configs(args.project_id, args.location)
