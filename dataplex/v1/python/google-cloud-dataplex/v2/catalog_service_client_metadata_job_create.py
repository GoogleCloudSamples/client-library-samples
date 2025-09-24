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

# [START dataplex_v1_catalogservice_create_metadata_job]
from google.api_core import exceptions
from google.cloud import dataplex_v1


def create_metadata_job_sample(
    project_id: str,
    location: str,
    metadata_job_id: str,
    entry_group_id: str,
    entry_type_id: str,
    source_storage_uri: str,
) -> None:
    """
    Creates a metadata job in Dataplex Universal Catalog.


    Args:
        project_id: The Google Cloud project ID.
        location: The Google Cloud region where the metadata job will be created
            (e.g., 'us-central1').
        metadata_job_id: The ID of the metadata job to create. This must be unique
            within the project and location.
        entry_group_id: The ID of an existing EntryGroup to scope the import job.
        entry_type_id: The ID of an existing EntryType to scope the import job.
        source_storage_uri: The Cloud Storage URI (e.g., 'gs://your-bucket-name/metadata-files/')
            where metadata import files are located.
    """
    client = dataplex_v1.CatalogServiceClient()

    parent = f"projects/{project_id}/locations/{location}"

    metadata_job = dataplex_v1.MetadataJob(
        type_=dataplex_v1.MetadataJob.Type.IMPORT,
        import_spec=dataplex_v1.MetadataJob.ImportJobSpec(
            scope=dataplex_v1.MetadataJob.ImportJobSpec.ImportJobScope(
                entry_groups=[
                    f"projects/{project_id}/locations/{location}/entryGroups/{entry_group_id}"
                ],
                entry_types=[
                    f"projects/{project_id}/locations/{location}/entryTypes/{entry_type_id}"
                ],
            ),
            entry_sync_mode=dataplex_v1.MetadataJob.ImportJobSpec.SyncMode.FULL,
            aspect_sync_mode=dataplex_v1.MetadataJob.ImportJobSpec.SyncMode.INCREMENTAL,
            # file format https://cloud.google.com/dataplex/docs/import-metadata#metadata-import-file
            source_storage_uri=source_storage_uri,
            log_level=dataplex_v1.MetadataJob.ImportJobSpec.LogLevel.INFO,
        ),
    )

    try:
        print(f"Creating metadata job '{metadata_job_id}' in {location}...")
        operation = client.create_metadata_job(
            parent=parent,
            metadata_job=metadata_job,
            metadata_job_id=metadata_job_id,
        )

        response = operation.result()

        print(f"Metadata job '{response.name}' created successfully.")
        print(f"Job Type: {dataplex_v1.MetadataJob.Type(response.type_).name}")
        if response.import_result:
            print(
                f"Import Job Result: Updated Entries = {response.import_result.updated_entries}, "
                f"Created Entries = {response.import_result.created_entries}"
            )

    except exceptions.AlreadyExists as e:
        print(f"Error: Metadata job '{metadata_job_id}' already exists. {e}")
        print("Please use a unique metadata job ID or check the existing job.")
    except exceptions.NotFound as e:
        print(
            f"Error: One or more resources not found. Please ensure the project, location, "
            f"entry group '{entry_group_id}', and entry type '{entry_type_id}' exist. {e}"
        )
    except Exception as e:
        print(f"An unexpected error occurred: {e}")


# [END dataplex_v1_catalogservice_create_metadata_job]


if __name__ == "__main__":
    parser = argparse.ArgumentParser(
        description="Creates a Dataplex metadata job (import type)."
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
        help="The Google Cloud region for the metadata job.",
    )
    parser.add_argument(
        "--metadata_job_id",
        type=str,
        required=True,
        help="The ID of the metadata job to create.",
    )
    parser.add_argument(
        "--entry_group_id",
        type=str,
        required=True,
        help="The ID of an existing EntryGroup to scope the import job.",
    )
    parser.add_argument(
        "--entry_type_id",
        type=str,
        required=True,
        help="The ID of an existing EntryType to scope the import job.",
    )
    parser.add_argument(
        "--source_storage_uri",
        type=str,
        required=True,
        help="The Cloud Storage URI where metadata import files are located.",
    )

    args = parser.parse_args()

    create_metadata_job_sample(
        project_id=args.project_id,
        location=args.location,
        metadata_job_id=args.metadata_job_id,
        entry_group_id=args.entry_group_id,
        entry_type_id=args.entry_type_id,
        source_storage_uri=args.source_storage_uri,
    )
