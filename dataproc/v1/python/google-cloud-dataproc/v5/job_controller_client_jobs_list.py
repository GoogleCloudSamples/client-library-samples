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

# [START dataproc_v1_jobcontroller_jobs_list]
from google.api_core import client_options, exceptions
from google.cloud import dataproc_v1


def list_dataproc_jobs(
    project_id: str,
    location: str,
    job_filter: str = "",
) -> None:
    """
    Lists Dataproc jobs in a given project and region.

    Args:
        project_id: The Google Cloud project ID.
        location: The Dataproc region (e.g., 'us-central1').
        job_filter: Optional. A filter string to narrow down the list of jobs.
                    Filters are case-sensitive and have the following syntax:
                    `[field = value] AND [field [= value]] ...`
                    where `field` is `status.state` or `labels.[KEY]`, and `[KEY]`
                    is a label key. `value` can be `*` to match all values.
                    `status.state` can be either `ACTIVE` or `NON_ACTIVE`.
                    Example: `status.state = ACTIVE AND labels.env = staging`
    """
    options = client_options.ClientOptions(
        api_endpoint=f"{location}-dataproc.googleapis.com:443"
    )
    client = dataproc_v1.JobControllerClient(client_options=options)

    request = dataproc_v1.ListJobsRequest(
        project_id=project_id,
        region=location,
        filter=job_filter,
    )

    print(f"Listing Dataproc jobs in project '{project_id}' and region '{location}'...")

    try:
        jobs = client.list_jobs(request=request)

        found_jobs = False
        for job in jobs:
            found_jobs = True
            print("----------------------------------------")
            print(f"Job ID: {job.reference.job_id}")
            print(f"  Status: {job.status.state.name}")
            if job.placement and job.placement.cluster_name:
                print(f"  Cluster: {job.placement.cluster_name}")
            if job.status.details:
                print(f"  Details: {job.status.details}")
            if job.driver_output_resource_uri:
                print(f"  Driver Output URI: {job.driver_output_resource_uri}")
            if job.labels:
                print(f"  Labels: {job.labels}")

        if not found_jobs:
            print("No Dataproc jobs found matching the criteria.")
        else:
            print("----------------------------------------")
            print("Successfully listed Dataproc jobs.")

    except exceptions.NotFound as e:
        print(
            f"Error: The specified project '{project_id}' or region '{location}' was not found or accessible."
        )
        print(f"Details: {e}")
        print(
            "Please ensure the project ID and region are correct and that the service account has the necessary permissions."
        )
    except exceptions.InvalidArgument as e:
        print(f"Error: Invalid argument provided for the request.")
        print(f"Details: {e}")
        print("Please check the filter format or other request parameters.")
    except Exception as e:
        print(f"An unexpected error occurred: {e}")


# [END dataproc_v1_jobcontroller_jobs_list]

if __name__ == "__main__":
    parser = argparse.ArgumentParser(
        description="Lists Dataproc jobs in a specified project and region."
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
        help="The Dataproc region (e.g., 'us-central1').",
    )
    parser.add_argument(
        "--filter",
        type=str,
        default="",
        help="Optional. A filter string to narrow down the list of jobs. "
        "Example: 'status.state = ACTIVE AND labels.env = staging'",
    )

    args = parser.parse_args()

    list_dataproc_jobs(args.project_id, args.location, args.filter)
