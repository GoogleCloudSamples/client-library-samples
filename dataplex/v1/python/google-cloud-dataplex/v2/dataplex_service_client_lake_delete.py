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

# [START dataplex_v1_dataplexservice_lake_delete]
from google.api_core import exceptions
from google.cloud import dataplex_v1


def delete_lake(
    project_id: str,
    location: str,
    lake_id: str,
) -> None:
    """Deletes a Google Cloud Dataplex lake resource.

    All zones within the lake must be deleted before the lake can be deleted.

    Args:
        project_id: The Google Cloud project ID.
        location: The Google Cloud region where the lake is located (e.g., "us-central1").
        lake_id: The ID of the lake to delete.
    """
    client = dataplex_v1.DataplexServiceClient()

    lake_name = client.lake_path(project_id, location, lake_id)

    request = dataplex_v1.DeleteLakeRequest(name=lake_name)

    print(f"Deleting lake: {lake_name}")
    try:
        operation = client.delete_lake(request=request)
        operation.result()
        print(f"Lake {lake_id} deleted successfully.")
    except exceptions.NotFound:
        print(
            f"Error: Lake '{lake_id}' not found at '{lake_name}'. "
            "Please check the project ID, location, and lake ID."
        )
    except Exception as e:
        print(f"Error deleting lake '{lake_id}': {e}")


# [END dataplex_v1_dataplexservice_lake_delete]


if __name__ == "__main__":
    parser = argparse.ArgumentParser(
        description="Deletes a Google Cloud Dataplex lake resource."
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
        required=True,
        help="The Google Cloud region where the lake is located.",
    )
    parser.add_argument(
        "--lake_id",
        type=str,
        required=True,
        help="The ID of the lake to delete.",
    )
    args = parser.parse_args()

    delete_lake(args.project_id, args.location, args.lake_id)
