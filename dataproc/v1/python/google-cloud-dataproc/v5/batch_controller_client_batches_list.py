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

# [START dataproc_v1_batchcontroller_batches_list]
from google.api_core import client_options, exceptions
from google.cloud import dataproc_v1


def list_dataproc_batches(project_id: str, location: str) -> None:
    """Lists all Dataproc batches in a given project and location.

    Args:
        project_id: The Google Cloud project ID.
        location: The Google Cloud region where the batches are located
                  (e.g., 'us-central1').
    """
    options = client_options.ClientOptions(
        api_endpoint=f"{location}-dataproc.googleapis.com:443"
    )
    client = dataproc_v1.BatchControllerClient(client_options=options)

    parent = f"projects/{project_id}/locations/{location}"

    request = dataproc_v1.ListBatchesRequest(
        parent=parent,
        page_size=10,
    )

    print(
        f"Listing Dataproc batches in project '{project_id}', location '{location}'..."
    )

    try:
        page_result = client.list_batches(request=request)

        found_batches = False
        for batch in page_result:
            found_batches = True
            print(f"Batch Name: {batch.name}")
            print(f"  State: {batch.state.name}")
            print(f"  Create Time: {batch.create_time.isoformat()}")
            if batch.pyspark_batch:
                print(
                    f"  PySpark Main File URI: {batch.pyspark_batch.main_python_file_uri}"
                )
            elif batch.spark_batch:
                if batch.spark_batch.main_jar_file_uri:
                    print(
                        f"  Spark Main Jar URI: {batch.spark_batch.main_jar_file_uri}"
                    )
                elif batch.spark_batch.main_class:
                    print(f"  Spark Main Class: {batch.spark_batch.main_class}")
            elif batch.spark_r_batch:
                print(f"  SparkR Main File URI: {batch.spark_r_batch.main_r_file_uri}")
            elif batch.spark_sql_batch:
                print(
                    f"  Spark SQL Query File URI: {batch.spark_sql_batch.query_file_uri}"
                )
            print("-" * 20)

        if not found_batches:
            print(
                f"No Dataproc batches found in project '{project_id}', location '{location}'."
            )

    except exceptions.NotFound as e:
        print(
            f"Error: The specified project '{project_id}' or location '{location}' was not found or is inaccessible."
        )
        print(
            f"Please ensure the project ID and location are correct and the service account has the necessary permissions (e.g., 'dataproc.batches.list')."
        )
        print(f"Details: {e}")
    except exceptions.InvalidArgument as e:
        print(
            f"Error: Invalid argument provided. Please check the project ID and location format."
        )
        print(f"Details: {e}")
    except Exception as e:
        print(f"An unexpected error occurred: {e}")


# [END dataproc_v1_batchcontroller_batches_list]

if __name__ == "__main__":
    parser = argparse.ArgumentParser(
        description="Lists all Dataproc batches in a given project and location."
    )
    parser.add_argument(
        "--project_id",
        required=True,
        help="The Google Cloud project ID."
        )
    parser.add_argument(
        "--location",
        required=True,
        help="The Google Cloud region where the batches are located (e.g., 'us-central1').",
    )
    args = parser.parse_args()
    list_dataproc_batches(args.project_id, args.location)
