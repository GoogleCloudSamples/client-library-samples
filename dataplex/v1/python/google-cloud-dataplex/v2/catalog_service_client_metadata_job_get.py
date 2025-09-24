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

# [START dataplex_v1_catalogservice_metadatajob_get]
from google.api_core import exceptions
from google.cloud import dataplex_v1


def get_metadata_job_sample(
    project_id: str,
    location_id: str,
    metadata_job_id: str,
) -> None:
    """
    Retrieves a specific metadata job by its ID.

    Args:
        project_id: The ID of the Google Cloud project.
        location_id: The ID of the Google Cloud location (e.g., 'us-central1').
        metadata_job_id: The ID of the metadata job to retrieve.
    """
    client = dataplex_v1.CatalogServiceClient()

    metadata_job_name = client.metadata_job_path(
        project=project_id,
        location=location_id,
        metadataJob=metadata_job_id,
    )

    try:
        response = client.get_metadata_job(name=metadata_job_name)

        print(f"Successfully retrieved metadata job: {response.name}")
        print(f"  Type: {response.type_.name}")
        print(f"  State: {response.status.state.name}")
        if response.status.message:
            print(f"  Status Message: {response.status.message}")
        print(f"  Create Time: {response.create_time.isoformat()}")

    except exceptions.NotFound:
        print(f"Error: Metadata job '{metadata_job_name}' not found.")
        print("Please check the project ID, location ID, and metadata job ID.")
    except Exception as e:
        print(f"An unexpected error occurred: {e}")


# [END dataplex_v1_catalogservice_metadatajob_get]


if __name__ == "__main__":
    parser = argparse.ArgumentParser(
        description="Retrieves a specific Dataplex metadata job."
    )
    parser.add_argument(
        "--project_id",
        type=str,
        required=True,
        help="The ID of the Google Cloud project.",
    )
    parser.add_argument(
        "--location_id",
        type=str,
        required=True,
        help="The ID of the Google Cloud location (e.g., 'us-central1').",
    )
    parser.add_argument(
        "--metadata_job_id",
        type=str,
        required=True,
        help="The ID of the metadata job to retrieve.",
    )
    args = parser.parse_args()

    get_metadata_job_sample(args.project_id, args.location_id, args.metadata_job_id)
