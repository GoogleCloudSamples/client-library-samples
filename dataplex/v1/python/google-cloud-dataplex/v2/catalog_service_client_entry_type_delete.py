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

# [START dataplex_v1_catalogservice_entrytype_delete]
from google.api_core import exceptions
from google.cloud import dataplex_v1


def delete_entry_type(
    project_id: str,
    location: str,
    entry_type_id: str,
) -> None:
    """
    Deletes an existing EntryType in Dataplex.

    Args:
        project_id: The Google Cloud project ID.
        location: The ID of the Google Cloud location (e.g., 'us-central1').
        entry_type_id: The ID of the EntryType to delete.
    """
    client = dataplex_v1.CatalogServiceClient()

    entry_type_name = client.entry_type_path(project_id, location, entry_type_id)

    try:
        request = dataplex_v1.DeleteEntryTypeRequest(name=entry_type_name)

        operation = client.delete_entry_type(request=request)
        operation.result()

        print(f"Successfully deleted EntryType: {entry_type_name}")

    except exceptions.NotFound:
        print(
            f"Error: EntryType '{entry_type_name}' not found. "
            f"Please ensure the EntryType ID and location are correct."
        )
    except exceptions.FailedPrecondition as e:
        print(
            f"Error: Cannot delete EntryType '{entry_type_name}'. "
            f"It might be in use or have dependencies. Details: {e}"
        )
    except Exception as e:
        print(f"An unexpected error occurred: {e}")


# [END dataplex_v1_catalogservice_entrytype_delete]


if __name__ == "__main__":
    parser = argparse.ArgumentParser(
        description="Deletes an existing Dataplex EntryType."
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
        help="The Google Cloud location ID (e.g., 'us-central1').",
    )
    parser.add_argument(
        "--entry_type_id",
        type=str,
        required=True,
        help="The ID of the EntryType to delete.",
    )
    args = parser.parse_args()

    delete_entry_type(args.project_id, args.location, args.entry_type_id)
