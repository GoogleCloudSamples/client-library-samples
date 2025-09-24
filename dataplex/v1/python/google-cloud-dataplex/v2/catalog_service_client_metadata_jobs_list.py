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

# [START dataplex_v1_catalogservice_metadatajobs_list]
from google.api_core import exceptions
from google.cloud import dataplex_v1


def list_metadata_jobs(project_id: str, location: str) -> None:
    """Lists metadata jobs in a given project and location.

    Args:
        project_id: The Google Cloud project ID.
        location: The ID of the Google Cloud location (e.g., 'us-central1').
    """
    client = dataplex_v1.CatalogServiceClient()

    parent = f"projects/{project_id}/locations/{location}"

    request = dataplex_v1.ListMetadataJobsRequest(
        parent=parent,
    )

    try:
        print(f"Listing metadata jobs in location: {location}...")
        page_result = client.list_metadata_jobs(request=request)

        found_jobs = False
        for job in page_result:
            found_jobs = True
            print(f"Metadata Job Name: {job.name}")
            print(f"  Type: {job.type_.name}")
            print(f"  State: {job.status.state.name}")
            if job.status.message:
                print(f"  Status Message: {job.status.message}")
            print(f"  Create Time: {job.create_time.isoformat()}")
            if job.update_time:
                print(f"  Update Time: {job.update_time.isoformat()}")
            print("-" * 20)

        if not found_jobs:
            print(f"No metadata jobs found in location: {location}.")

    except exceptions.NotFound:
        print(
            f"Error: The specified location '{location}' or project '{project_id}' "
            "does not exist or is inaccessible. "
            "Please ensure the project ID and location are correct and the service account "
            "has the necessary permissions (e.g., Dataplex Viewer)."
        )
    except Exception as e:
        print(f"An unexpected error occurred: {e}")


# [END dataplex_v1_catalogservice_metadatajobs_list]


if __name__ == "__main__":
    parser = argparse.ArgumentParser(
        description="Lists metadata jobs in a given project and location."
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
        help="The ID of the Google Cloud location (e.g., 'us-central1').",
    )
    args = parser.parse_args()
    list_metadata_jobs(args.project_id, args.location)
