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

# [START dataproc_v1_batchcontroller_batch_get]
from google.api_core import client_options, exceptions
from google.cloud import dataproc_v1


def get_dataproc_batch(
    project_id: str,
    location: str,
    batch_id: str,
) -> None:
    """
    Retrieves a Dataproc batch workload by its ID.

    This method demonstrates how to fetch the details of an existing Dataproc
    batch workload. Batches are long-running, serverless jobs that execute
    Spark, PySpark, SparkR, or Spark SQL applications.

    Args:
        project_id: The Google Cloud project ID.
        location: The Google Cloud region where the batch is located (e.g., 'us-central1').
        batch_id: The ID of the batch workload to retrieve.
    """
    options = client_options.ClientOptions(
        api_endpoint=f"{location}-dataproc.googleapis.com:443"
    )

    client = dataproc_v1.BatchControllerClient(client_options=options)

    batch_name = client.batch_path(project_id, location, batch_id)

    try:
        print(f"Retrieving batch: {batch_name}")
        batch = client.get_batch(name=batch_name)

        print(f"Successfully retrieved batch: {batch.name}")
        print(f"  UUID: {batch.uuid}")
        print(f"  State: {batch.state.name}")
        print(f"  Creator: {batch.creator}")
        print(f"  Create Time: {batch.create_time.isoformat()}")

        if batch.pyspark_batch:
            print(
                f"  PySpark Main Python File URI: {batch.pyspark_batch.main_python_file_uri}"
            )
        elif batch.spark_batch:
            print(
                f"  Spark Main Class/Jar: {batch.spark_batch.main_class or batch.spark_batch.main_jar_file_uri}"
            )

    except exceptions.NotFound:
        print(f"Error: Batch '{batch_name}' not found.")
        print("Please ensure the project ID, region, and batch ID are correct.")
    except Exception as e:
        print(f"An unexpected error occurred: {e}")
        print("Please check your network connection or API permissions.")


# [END dataproc_v1_batchcontroller_batch_get]

if __name__ == "__main__":
    parser = argparse.ArgumentParser(
        description="Retrieve a Dataproc batch workload by its ID."
    )
    parser.add_argument(
        "--project_id", type=str, help="The Google Cloud project ID.", required=True
    )
    parser.add_argument(
        "--location",
        type=str,
        help="The Google Cloud region where the batch is located (e.g., 'us-central1').",
        required=True,
    )
    parser.add_argument(
        "--batch_id",
        type=str,
        help="The ID of the batch workload to retrieve.",
        required=True,
    )

    args = parser.parse_args()

    get_dataproc_batch(args.project_id, args.location, args.batch_id)
