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

# [START retail_v2beta_modelservice_delete_model]
from google.api_core import exceptions
from google.cloud import retail_v2beta


def delete_retail_model(
    project_id: str,
    location: str,
    catalog_id: str,
    model_id: str,
) -> None:
    """
    Deletes an existing Retail model.

    Args:
        project_id: The ID of the Google Cloud project.
        location: The Google Cloud location (e.g., "global").
        catalog_id: The ID of the catalog to which the model belongs (e.g., "default_catalog").
        model_id: The ID of the model to delete.
    """
    client = retail_v2beta.ModelServiceClient()

    # Construct the full resource name of the model to delete.
    model_name = client.model_path(
        project=project_id,
        location=location,
        catalog=catalog_id,
        model=model_id,
    )

    try:
        client.delete_model(name=model_name)
        print(f"Model {model_name} deleted successfully.")
    except exceptions.NotFound:
        print(
            f"Model {model_name} not found. It may have already been deleted or never existed."
        )
    except Exception as e:
        print(f"An error occurred while deleting model {model_name}: {e}")


# [END retail_v2beta_modelservice_delete_model]


if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Delete a Retail model.")
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
        help="The Google Cloud location.",
    )
    parser.add_argument(
        "--catalog_id",
        type=str,
        default="default_catalog",
        help="The ID of the catalog.",
    )
    parser.add_argument(
        "--model_id",
        type=str,
        required=True,
        help="The ID of the model to delete.",
    )

    args = parser.parse_args()

    delete_retail_model(
        project_id=args.project_id,
        location=args.location,
        catalog_id=args.catalog_id,
        model_id=args.model_id,
    )
