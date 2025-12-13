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

# [START dataplex_v1_catalogservice_aspecttype_create]
from google.api_core import exceptions
from google.cloud import dataplex_v1


def create_aspect_type(
    project_id: str,
    location: str,
    aspect_type_id: str,
) -> None:
    """
    Creates an AspectType in Dataplex Universal Catalog.

    Args:
        project_id: The Google Cloud project ID.
        location: The Google Cloud location (e.g., 'us-central1').
        aspect_type_id: The ID to use for the AspectType.
    """
    client = dataplex_v1.CatalogServiceClient()

    parent = f"projects/{project_id}/locations/{location}"

    metadata_template = dataplex_v1.AspectType.MetadataTemplate(
        name=aspect_type_id,
        type="record",
        record_fields=[
            dataplex_v1.AspectType.MetadataTemplate(
                name="description_field",
                type="string",
                index=1,
                annotations=dataplex_v1.AspectType.MetadataTemplate.Annotations(
                    display_name="Description",
                    description="A brief description for this aspect.",
                ),
            )
        ],
    )

    aspect_type = dataplex_v1.AspectType(
        display_name="My Sample Aspect Type",
        description="A sample AspectType for demonstration purposes.",
        metadata_template=metadata_template,
    )

    request = dataplex_v1.CreateAspectTypeRequest(
        parent=parent,
        aspect_type_id=aspect_type_id,
        aspect_type=aspect_type,
    )

    print(f"Creating AspectType {aspect_type_id}...")
    try:
        operation = client.create_aspect_type(request=request)
        response = operation.result()
        print(f"AspectType created successfully: {response.name}")
    except exceptions.AlreadyExists as e:
        print(f"AspectType '{aspect_type_id}' already exists in {parent}: {e}")
        print("Consider using update_aspect_type if you want to modify it.")
    except Exception as e:
        print(f"Error creating AspectType: {e}")


# [END dataplex_v1_catalogservice_aspecttype_create]

if __name__ == "__main__":
    parser = argparse.ArgumentParser(
        description="Demonstrates creating an AspectType in Dataplex Universal Catalog."
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
        required=True,
        help="The Google Cloud location for the AspectType.",
    )
    parser.add_argument(
        "--aspect_type_id",
        type=str,
        required=True,
        help="The ID to use for the new AspectType.",
    )
    args = parser.parse_args()

    create_aspect_type(args.project_id, args.location, args.aspect_type_id)
