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

# [START dataproc_v1_batchcontroller_create_batch]
from google.api_core import client_options, exceptions
from google.cloud import dataproc_v1


def create_dataproc_batch(
    project_id: str, location: str, batch_id: str, main_python_file: str
) -> None:
    """
    Creates a PySpark batch workload on Dataproc Serverless.

    This sample demonstrates how to submit a simple PySpark job to Dataproc
    Serverless. The script must be uploaded to a GCS bucket accessible
    by Dataproc Serverless.

    Args:
        project_id: The Google Cloud project ID.
        location: The Dataproc region (e.g., 'us-central1').
        batch_id: The ID of the PySpark batch workload.
        main_python_file: The Google Cloud Storage URL to your Pyspark job script.
    """
    options = client_options.ClientOptions(
        api_endpoint=f"{location}-dataproc.googleapis.com:443"
    )

    client = dataproc_v1.BatchControllerClient(client_options=options)

    parent = f"projects/{project_id}/locations/{location}"

    pyspark_batch = dataproc_v1.PySparkBatch(main_python_file_uri=main_python_file)

    batch = dataproc_v1.Batch(
        pyspark_batch=pyspark_batch,
        labels={
            "env": "dev",
            "job_type": "pyspark-example",
        },
    )

    request = dataproc_v1.CreateBatchRequest(
        parent=parent,
        batch=batch,
        batch_id=batch_id,
    )

    print(f"Submitting PySpark batch '{batch_id}' to {parent}...")

    try:
        operation = client.create_batch(request=request)

        print("Waiting for batch operation to complete...")
        response = operation.result()

        print(f"Batch '{response.name}' created successfully.")
        print(f"State: {response.state.name}")
        print(f"Job URI: {response.runtime_info.output_uri}")

    except exceptions.AlreadyExists as e:
        print(
            f"Error: Batch '{batch_id}' already exists. Please use a different batch_id or delete the existing one. Details: {e}"
        )
    except Exception as e:
        print(f"An unexpected error occurred: {e}")


# [END dataproc_v1_batchcontroller_create_batch]

if __name__ == "__main__":
    parser = argparse.ArgumentParser(
        description="Creates a Dataproc Serverless PySpark batch workload."
    )
    parser.add_argument(
        "--project_id",
        required=True,
        help="Your Google Cloud project ID.",
    )
    parser.add_argument(
        "--location",
        required=True,
        help="The Dataproc region (e.g., 'us-central1').",
    )
    parser.add_argument(
        "--batch_id",
        required=True,
        help="The ID of the PySpark batch workload.",
    )

    parser.add_argument(
        "--main_python_file",
        required=True,
        help="The Google Cloud Storage URL to the job's main Python file."
        "Example: 'gs://your-gcs-bucket/path/to/job.py'.",
    )

    args = parser.parse_args()

    create_dataproc_batch(
        args.project_id, args.location, args.batch_id, args.main_python_file
    )
