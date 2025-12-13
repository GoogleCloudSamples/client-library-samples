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

# [START retail_v2_generativequestionservice_generativequestionsfeatureconfig_get]
from google.api_core import exceptions
from google.cloud import retail_v2


def get_generative_questions_feature_config(
    project_id: str,
    location: str,
    catalog_id: str,
) -> None:
    """
    Retrieves the configuration for the Generative Questions feature for a given catalog.

    This method allows you to check whether the Generative Questions feature is enabled
    for a specific retail catalog and its associated settings.

    Args:
        project_id: The Google Cloud project ID.
        location: The location of the catalog (e.g., "global").
        catalog_id: The ID of the catalog to retrieve the feature configuration for.
    """
    client = retail_v2.GenerativeQuestionServiceClient()

    # Construct the full resource name for the catalog.
    catalog_name = client.catalog_path(project_id, location, catalog_id)

    try:
        request = retail_v2.GetGenerativeQuestionsFeatureConfigRequest(
            catalog=catalog_name,
        )

        response = client.get_generative_questions_feature_config(request=request)

        print("Retrieved Generative Questions Feature Config:")
        print(f"  Catalog: {response.catalog}")
        print(f"  Feature Enabled: {response.feature_enabled}")
        print(f"  Minimum Products: {response.minimum_products}")

    except exceptions.NotFound as e:
        print(
            f"Error: Generative Questions Feature Config not found for catalog {catalog_name}."
        )
        print(
            "Please ensure the catalog ID and location are correct and the feature has been initialized."
        )
    except exceptions.GoogleAPICallError as e:
        print(f"An API error occurred: {e.message}")
        print(
            "Please check your project ID, location, and catalog ID, and ensure the Retail API is enabled."
        )
    except Exception as e:
        print(f"An unexpected error occurred: {e}")


# [END retail_v2_generativequestionservice_generativequestionsfeatureconfig_get]

if __name__ == "__main__":
    parser = argparse.ArgumentParser(
        description="Get Generative Questions Feature Config for a Retail catalog."
    )
    parser.add_argument(
        "--project_id",
        type=str,
        required=True,
        help="The Google Cloud project ID.",
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
        help="The ID of the catalog to retrieve the feature configuration for.",
    )

    args = parser.parse_args()

    get_generative_questions_feature_config(
        project_id=args.project_id,
        location=args.location,
        catalog_id=args.catalog_id,
    )
