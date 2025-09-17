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

# [START eventarc_v1_eventarc_delete_google_api_source]
from google.api_core import exceptions
from google.cloud import eventarc_v1


def delete_google_api_source(
    project_id: str,
    location: str,
    google_api_source_id: str,
) -> None:
    """
    Deletes a GoogleApiSource.

    Args:
        project_id: The Google Cloud project ID.
        location: The region for the GoogleApiSource (e.g., "us-central1").
        google_api_source_id: The ID of the GoogleApiSource to delete.
    """
    client = eventarc_v1.EventarcClient()

    name = client.google_api_source_path(project_id, location, google_api_source_id)

    try:
        request = eventarc_v1.DeleteGoogleApiSourceRequest(name=name)

        operation = client.delete_google_api_source(request=request)

        print(f"Waiting for operation to complete deleting GoogleApiSource: {name}")
        response = operation.result()

        print(f"GoogleApiSource {response.name} deleted successfully.")

    except exceptions.NotFound:
        print(f"GoogleApiSource {name} not found. It may have already been deleted.")
    except Exception as e:
        print(f"Error deleting GoogleApiSource {name}: {e}")


# [END eventarc_v1_eventarc_delete_google_api_source]


if __name__ == "__main__":
    parser = argparse.ArgumentParser(
        description="Deletes a GoogleApiSource in Eventarc."
    )
    parser.add_argument(
        "--project_id",
        help="The Google Cloud project ID.",
        required=True,
    )
    parser.add_argument(
        "--location",
        help="The region for the GoogleApiSource (e.g., 'us-central1').",
        required=True,
    )
    parser.add_argument(
        "--google_api_source_id",
        help="The ID of the GoogleApiSource to delete.",
        required=True,
    )

    args = parser.parse_args()

    delete_google_api_source(args.project_id, args.location, args.google_api_source_id)
