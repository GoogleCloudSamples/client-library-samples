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

# [START dataproc_v1_jobcontroller_job_get]
from google.api_core import client_options, exceptions
from google.cloud import dataproc_v1


def get_dataproc_job(
    project_id: str,
    location: str,
    job_id: str,
) -> None:
    """
    Retrieves the resource representation for a Dataproc job.

    This function demonstrates how to fetch details of an existing Dataproc job
    using its project ID, region, and job ID. It's useful for monitoring job
    status, retrieving output URIs, or inspecting job configurations after submission.

    Args:
        project_id: The Google Cloud project ID.
        location: The Dataproc region where the job is located (e.g., "us-central1").
        job_id: The ID of the job to retrieve.
    """
    options = client_options.ClientOptions(
        api_endpoint=f"{location}-dataproc.googleapis.com:443"
    )
    client = dataproc_v1.JobControllerClient(client_options=options)

    request = dataproc_v1.GetJobRequest(
        project_id=project_id,
        region=location,
        job_id=job_id,
    )

    try:
        job = client.get_job(request=request)

        print(f"Successfully retrieved job: {job.reference.job_id}")
        print(f"  Project ID: {job.reference.project_id}")
        print(f"  Region: {job.placement.cluster_name}")
        print(f"  Status: {job.status.state.name}")
        if job.status.details:
            print(f"  Status Details: {job.status.details}")
        if job.driver_output_resource_uri:
            print(f"  Driver Output URI: {job.driver_output_resource_uri}")

    except exceptions.NotFound:
        print(
            f"Error: Job '{job_id}' not found in project '{project_id}' and region '{location}'."
        )
        print("Please ensure the job ID, project ID, and region are correct.")
    except Exception as e:
        print(f"An unexpected error occurred: {e}")
        print("Please check your network connection and project permissions.")


# [END dataproc_v1_jobcontroller_job_get]


if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Retrieve a Dataproc job's details.")
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
        help="The Dataproc region where the job is located (e.g., 'us-central1').",
    )
    parser.add_argument(
        "--job_id",
        type=str,
        required=True,
        help="The ID of the job to retrieve.",
    )
    args = parser.parse_args()

    get_dataproc_job(args.project_id, args.location, args.job_id)
