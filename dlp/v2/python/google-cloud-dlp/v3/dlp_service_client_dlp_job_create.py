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

# [START dlp_v2_dlpservice_create_dlpjob]
import google.api_core.exceptions
from google.cloud import dlp_v2


def create_dlp_job(
    project_id: str,
    gcs_path: str,
    output_project_id: str,
    output_dataset_id: str,
    location: str,
    job_id: str = None,
) -> None:
    """Creates a new DLP job to inspect storage and save findings to BigQuery.

    Args:
        project_id: The Google Cloud project ID.
        gcs_path: The Google Cloud Storage path to inspect (e.g., "gs://my-bucket/").
        output_project_id: The Google Cloud project ID where the BigQuery dataset
            for findings will be created.
        output_dataset_id: The BigQuery dataset ID where findings will be saved.
            DLP will create a table within this dataset.
        location: The Google Cloud region to run the DLP job in (e.g., 'global', 'us-central1').
        job_id: Optional. The ID to use for the DLP job. If not provided, a random
            ID will be generated. The ID may be changed on creation.
    """
    client = dlp_v2.DlpServiceClient()

    parent = f"projects/{project_id}/locations/{location}"

    # Configure the storage to inspect
    storage_config = dlp_v2.StorageConfig(
        cloud_storage_options=dlp_v2.CloudStorageOptions(
            file_set=dlp_v2.CloudStorageOptions.FileSet(url=gcs_path)
        )
    )

    # Configure the inspection criteria
    inspect_config = dlp_v2.InspectConfig(
        info_types=[
            {"name": "PHONE_NUMBER"},
            {"name": "EMAIL_ADDRESS"},
            {"name": "CREDIT_CARD_NUMBER"},
        ],
        min_likelihood=dlp_v2.Likelihood.POSSIBLE,
        include_quote=True,  # Include the sensitive data in the findings
    )

    # Configure where to save the findings
    output_table = dlp_v2.BigQueryTable(
        project_id=output_project_id,
        dataset_id=output_dataset_id,
    )
    output_storage_config = dlp_v2.OutputStorageConfig(table=output_table)

    # Configure the action to save findings
    actions = [
        dlp_v2.Action(
            save_findings=dlp_v2.Action.SaveFindings(
                output_config=output_storage_config
            )
        )
    ]

    # Combine configurations into an InspectJobConfig
    inspect_job_config = dlp_v2.InspectJobConfig(
        storage_config=storage_config,
        inspect_config=inspect_config,
        actions=actions,
    )

    # Create the DLP job request
    request = dlp_v2.CreateDlpJobRequest(
        parent=parent,
        inspect_job=inspect_job_config,
        job_id=job_id,  # Optional: provide a custom job ID
    )

    try:
        dlp_job = client.create_dlp_job(request=request)
        print(f"Successfully created DLP job: {dlp_job.name}")
        print(f"Job state: {dlp_job.state.name}")
        print(
            f"Findings will be saved to BigQuery dataset: {output_table.project_id}.{output_table.dataset_id}.<generated_table_id>"
        )
        print("Monitor the job status to see when it completes.")
    except google.api_core.exceptions.AlreadyExists:
        print(
            f"Error: A DLP job with ID '{job_id}' already exists. Please choose a unique ID or omit it to auto-generate."
        )
    except google.api_core.exceptions.GoogleAPICallError as e:
        print(f"An API error occurred: {e.message}")
        print("Please check the project ID, GCS path, and BigQuery permissions.")
        if "Permission denied" in e.message:
            print(
                "Ensure the service account running this code has the 'DLP Administrator' role on the project and 'Storage Object Viewer' on the GCS bucket, and 'BigQuery Data Editor' on the output dataset."
            )
        elif "Bucket not found" in e.message:
            print(f"Ensure the GCS bucket '{gcs_path}' exists and is accessible.")
        elif "Dataset not found" in e.message:
            print(
                f"Ensure the BigQuery dataset '{output_dataset_id}' exists in project '{output_project_id}' or DLP has permissions to create it."
            )


# [END dlp_v2_dlpservice_create_dlpjob]


if __name__ == "__main__":
    parser = argparse.ArgumentParser(
        description="Creates a DLP job to inspect GCS and save findings to BigQuery."
    )
    parser.add_argument(
        "--project_id",
        required=True,
        type=str,
        help="The Google Cloud project ID where the DLP job will run.",
    )
    parser.add_argument(
        "--gcs_path",
        required=True,
        type=str,
        help="The Google Cloud Storage path to inspect (e.g., 'gs://my-bucket/').",
    )
    parser.add_argument(
        "--output_project_id",
        required=True,
        type=str,
        help="The Google Cloud project ID where the BigQuery dataset for findings will be created.",
    )
    parser.add_argument(
        "--output_dataset_id",
        required=True,
        type=str,
        help="The BigQuery dataset ID where findings will be saved. DLP will create a table within this dataset.",
    )
    parser.add_argument(
        "--location",
        required=True,
        type=str,
        help="The Google Cloud region to run the DLP job in (e.g., 'global', 'us-central1').",
    )
    parser.add_argument(
        "--job_id",
        help="Optional. The ID to use for the DLP job. If not provided, a random ID will be generated.",
        default=None,
    )
    args = parser.parse_args()

    create_dlp_job(
        args.project_id,
        args.gcs_path,
        args.output_project_id,
        args.output_dataset_id,
        args.location,
        args.job_id,
    )
