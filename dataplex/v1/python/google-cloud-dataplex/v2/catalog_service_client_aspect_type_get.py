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

# [START dataplex_v1_catalogservice_get_aspect_type]
from google.api_core import exceptions
from google.cloud import dataplex_v1


def get_aspect_type(
    project_id: str,
    location_id: str,
    aspect_type_id: str,
) -> None:
    """
    Retrieves an existing AspectType resource.


    Args:
        project_id: Your Google Cloud project ID.
        location_id: The ID of the Google Cloud location (e.g., 'us-central1').
        aspect_type_id: The ID of the AspectType to retrieve.
    """
    client = dataplex_v1.CatalogServiceClient()

    name = client.aspect_type_path(
        project=project_id,
        location=location_id,
        aspect_type=aspect_type_id,
    )

    request = dataplex_v1.GetAspectTypeRequest(name=name)

    try:
        aspect_type = client.get_aspect_type(request=request)

        print(f"Successfully retrieved AspectType: {aspect_type.name}")
        print(f"Description: {aspect_type.description}")
        print(f"Display Name: {aspect_type.display_name}")
        print(f"Create Time: {aspect_type.create_time.isoformat()}")
        if aspect_type.metadata_template:
            print(f"Metadata Template Name: {aspect_type.metadata_template.name}")
            print(f"Metadata Template Type: {aspect_type.metadata_template.type}")

    except exceptions.NotFound:
        print(f"Error: AspectType '{name}' not found.")
        print(
            "Please ensure the project ID, location ID, and aspect type ID are correct."
        )
    except exceptions.GoogleAPICallError as e:
        print(f"Error retrieving AspectType: {e}")


# [END dataplex_v1_catalogservice_get_aspect_type]


if __name__ == "__main__":
    parser = argparse.ArgumentParser(
        description="Retrieves an existing Dataplex AspectType."
    )
    parser.add_argument(
        "--project_id",
        type=str,
        required=True,
        help="Your Google Cloud project ID.",
    )
    parser.add_argument(
        "--location_id",
        type=str,
        required=True,
        help="The ID of the Google Cloud location (e.g., 'us-central1').",
    )
    parser.add_argument(
        "--aspect_type_id",
        type=str,
        required=True,
        help="The ID of the AspectType to retrieve.",
    )
    args = parser.parse_args()

    get_aspect_type(args.project_id, args.location_id, args.aspect_type_id)
