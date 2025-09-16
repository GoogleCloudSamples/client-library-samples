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

# [START retail_v2alpha_generativequestionservice_generativequestionsfeatureconfig_get]
from google.api_core import exceptions
from google.cloud import retail_v2alpha


def get_generative_questions_feature_config(
    project_id: str,
    location: str,
    catalog_id: str,
) -> None:
    """
    Retrieves the GenerativeQuestionsFeatureConfig for a given catalog.

    This configuration manages the overall state of the generative question feature,
    including whether it is enabled.

    Args:
        project_id: The ID of the Google Cloud project.
        location: The Google Cloud location (e.g., "global").
        catalog_id: The ID of the catalog to retrieve the configuration for.
                    Usually "default_catalog".
    """
    client = retail_v2alpha.GenerativeQuestionServiceClient()

    # The resource name of the catalog.
    catalog_name = client.catalog_path(project_id, location, catalog_id)

    try:
        request = retail_v2alpha.GetGenerativeQuestionsFeatureConfigRequest(
            catalog=catalog_name,
        )

        response = client.get_generative_questions_feature_config(request=request)

        print("Retrieved Generative Questions Feature Config:")
        print(f"  Name: {response.catalog}")
        print(f"  Feature Enabled: {response.feature_enabled}")
        print(f"  Minimum Products: {response.minimum_products}")

    except exceptions.NotFound:
        print(
            f"Generative Questions Feature Config not found for catalog: {catalog_name}. "
            "It might not be set up yet or the catalog name is incorrect."
        )
    except Exception as e:
        print(f"An error occurred: {e}")


# [END retail_v2alpha_generativequestionservice_generativequestionsfeatureconfig_get]

if __name__ == "__main__":
    parser = argparse.ArgumentParser(
        description="Retrieves the Generative Questions Feature Config for a given catalog."
    )
    parser.add_argument(
        "--project_id",
        type=str,
        required=True,
        help="The ID of the Google Cloud project.",
    )
    parser.add_argument(
        "--location",
        type=str,
        default="global",
        help="The Google Cloud location (e.g., 'global').",
    )
    parser.add_argument(
        "--catalog_id",
        type=str,
        default="default_catalog",
        help="The ID of the catalog to retrieve the configuration for.",
    )

    args = parser.parse_args()

    get_generative_questions_feature_config(
        args.project_id,
        args.location,
        args.catalog_id,
    )
