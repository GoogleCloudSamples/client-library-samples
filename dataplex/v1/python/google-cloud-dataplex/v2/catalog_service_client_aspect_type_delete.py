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

# [START dataplex_v1_catalogservice_aspecttype_delete]
from google.api_core import exceptions
from google.cloud import dataplex_v1


def delete_aspect_type(
    project_id: str,
    location_id: str,
    aspect_type_id: str,
) -> None:
    """
    Deletes an existing AspectType in Dataplex.

    Args:
        project_id: The Google Cloud project ID.
        location_id: The ID of the Google Cloud location (e.g., 'us-central1').
        aspect_type_id: The ID of the AspectType to delete.
    """
    client = dataplex_v1.CatalogServiceClient()

    name = client.aspect_type_path(project_id, location_id, aspect_type_id)

    try:
        operation = client.delete_aspect_type(name=name)
        operation.result()
        print(f"AspectType {name} deleted successfully.")
    except exceptions.NotFound:
        print(f"AspectType {name} not found. It may have already been deleted.")
    except Exception as e:
        print(f"Error deleting AspectType {name}: {e}")


# [END dataplex_v1_catalogservice_aspecttype_delete]


if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Deletes an AspectType in Dataplex.")
    parser.add_argument(
        "--project_id",
        type=str,
        required=True,
        help="Your Google Cloud Project ID.",
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
        help="The ID of the AspectType to delete.",
    )

    args = parser.parse_args()
    delete_aspect_type(args.project_id, args.location_id, args.aspect_type_id)
