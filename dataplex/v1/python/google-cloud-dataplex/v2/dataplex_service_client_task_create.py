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

from google.api_core import exceptions

# [START dataplex_v1_dataplexservice_task_create]
from google.cloud import dataplex_v1

def create_task(
    project_id: str,
    location: str,
    lake_id: str,
    task_id: str,
    service_account: str,
    main_jar_file_uri: str,
    schedule: str,
) -> None:
    """
    Creates a Dataplex task resource within a specified lake.

    A Dataplex task defines a recurring or on-demand workload (e.g., a Spark job)
    that operates on data within a lake. This sample demonstrates creating a Spark
    task that runs on a schedule.

    Args:
        project_id: The Google Cloud project ID.
        location: The Google Cloud region (e.g., 'us-central1').
        lake_id: The ID of the lake where the task will be created.
        task_id: The ID to use for the task resource.
        service_account: The service account email to use for executing the task.
                         This service account must have appropriate permissions
                         (e.g., Dataplex Data Scan Agent, Storage Object Viewer,
                         Dataproc Worker) to access data and run the job.
        main_jar_file_uri: The Cloud Storage URI of the main JAR file for the Spark job.
                           (e.g., 'gs://your-bucket/path/to/your-spark-job.jar').
        schedule: A cron schedule string for recurring tasks (e.g., '0 * * * *' for hourly).
    """
    # Create a client
    client = dataplex_v1.DataplexServiceClient()

    # Construct the parent resource name
    # projects/{project_number}/locations/{location_id}/lakes/{lake_id}
    parent = client.lake_path(project_id, location, lake_id)

    # Configure the task
    task = dataplex_v1.Task(
        display_name=f"Dataplex Spark Task {task_id}",
        description=f"A sample Spark task for lake {lake_id}",
        trigger_spec=dataplex_v1.Task.TriggerSpec(
            type_=dataplex_v1.Task.TriggerSpec.Type.RECURRING,
            schedule=schedule,
            disabled=False,
            max_retries=3,
        ),
        execution_spec=dataplex_v1.Task.ExecutionSpec(
            service_account=service_account,
            # Optional: You can add arguments to pass to your Spark job
            # args={
            #     "--input": "gs://your-input-data",
            #     "--output": "gs://your-output-data",
            # },
        ),
        spark=dataplex_v1.Task.SparkTaskConfig(
            main_jar_file_uri=main_jar_file_uri,
            # Optional: Configure infrastructure for the Spark job
            infrastructure_spec=dataplex_v1.Task.InfrastructureSpec(
                batch=dataplex_v1.Task.InfrastructureSpec.BatchComputeResources(
                    executors_count=2,
                    max_executors_count=10,
                ),
                container_image=dataplex_v1.Task.InfrastructureSpec.ContainerImageRuntime(
                    image="gcr.io/cloud-dataplex/spark-3.3:latest",
                    java_jars=["gs://dataplex-bucket/dependencies/my-dependency.jar"],
                ),
            ),
        ),
    )

    print(f"Creating task {task_id} in lake {lake_id}...")
    try:
        # Make the request
        operation = client.create_task(parent=parent, task_id=task_id, task=task)
        response = operation.result()
        print(f"Successfully created task: {response.name}")
        print(f"Task state: {response.state.name}")
    except exceptions.AlreadyExists as e:
        print(f"Task '{task_id}' already exists in lake '{lake_id}'. Error: {e}")
    except Exception as e:
        print(f"Error creating task: {e}")

# [END dataplex_v1_dataplexservice_task_create]

if __name__ == "__main__":
    parser = argparse.ArgumentParser(
        description="Creates a Dataplex task resource within a specified lake."
    )
    parser.add_argument(
        "--project_id",
        type=str,
        default="cloud-llm-preview",  # Replace with your Google Cloud Project ID
        help="The Google Cloud project ID.",
    )
    parser.add_argument(
        "--location",
        type=str,
        default="us-central1",  # Replace with your Google Cloud region
        help="The Google Cloud region (e.g., 'us-central1').",
    )
    parser.add_argument(
        "--lake_id",
        type=str,
        default="my-sample-lake",  # Replace with your lake ID
        help="The ID of the lake where the task will be created.",
    )
    parser.add_argument(
        "--task_id",
        type=str,
        default="my-sample-spark-task",  # Replace with your desired task ID
        help="The ID to use for the task resource.",
    )
    parser.add_argument(
        "--service_account",
        type=str,
        default="your-service-account@your-project-id.iam.gserviceaccount.com", # Replace with a valid service account
        help="The service account email to use for executing the task.",
    )
    parser.add_argument(
        "--main_jar_file_uri",
        type=str,
        default="gs://cloud-samples-data/dataplex/spark-template.jar", # Replace with a valid GCS path to your Spark JAR
        help="The Cloud Storage URI of the main JAR file for the Spark job.",
    )
    parser.add_argument(
        "--schedule",
        type=str,
        default="0 * * * *", # Run every hour
        help="A cron schedule string for recurring tasks (e.g., '0 * * * *' for hourly).",
    )

    args = parser.parse_args()

    create_task(
        project_id=args.project_id,
        location=args.location,
        lake_id=args.lake_id,
        task_id=args.task_id,
        service_account=args.service_account,
        main_jar_file_uri=args.main_jar_file_uri,
        schedule=args.schedule,
    )
