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

# [START retail_v2_model_service_delete_model]
from google.api_core.exceptions import NotFound
from google.cloud import retail_v2


def delete_retail_model(
    project_id: str,
    location_id: str,
    catalog_id: str,
    model_id: str,
) -> None:
    """
    Deletes an existing model.

    Args:
        project_id: The ID of the Google Cloud project.
        location_id: The ID of the location where the model is located.
            Typically, this is 'global'.
        catalog_id: The ID of the catalog to which the model belongs.
            Typically, this is 'default_catalog'.
        model_id: The ID of the model to delete.
    """

    client = retail_v2.ModelServiceClient()

    name = client.model_path(
        project=project_id,
        location=location_id,
        catalog=catalog_id,
        model=model_id,
    )

    request = retail_v2.DeleteModelRequest(name=name)

    try:
        client.delete_model(request=request)

        print(f"Model {name} deleted successfully.")
    except NotFound:
        print(
            f"Model {name} not found. It might have already been deleted or never existed."
        )
    except Exception as e:
        print(f"Error deleting model {name}: {e}")


# [END retail_v2_model_service_delete_model]


if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Deletes a Retail model.")
    parser.add_argument(
        "--project_id",
        type=str,
        required=True,
        help="The ID of the Google Cloud project.",
    )
    parser.add_argument(
        "--location_id",
        type=str,
        default="global",
        help="The ID of the location where the model is located.",
    )
    parser.add_argument(
        "--catalog_id",
        type=str,
        default="default_catalog",
        help="The ID of the catalog to which the model belongs.",
    )
    parser.add_argument(
        "--model_id",
        type=str,
        required=True,
        help="The ID of the model to delete. ",
    )

    args = parser.parse_args()

    delete_retail_model(
        project_id=args.project_id,
        location_id=args.location_id,
        catalog_id=args.catalog_id,
        model_id=args.model_id,
    )
