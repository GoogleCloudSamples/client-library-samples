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

# [START dataproc_v1_autoscalingpolicyservice_autoscalingpolicies_list]
from google.api_core import exceptions
from google.cloud import dataproc_v1

def list_autoscaling_policies_sample(
    project_id: str,
    location: str,
) -> None:
    """
    Lists autoscaling policies in a Google Cloud Dataproc project within a specified region.

    This sample demonstrates how to retrieve a paginated list of autoscaling policies
    configured for Dataproc clusters in a given project and region. Autoscaling policies
    define how Dataproc clusters automatically adjust their size based on workload.

    Args:
        project_id: The Google Cloud project ID.
        location: The Google Cloud region where the autoscaling policies are located
                (e.g., 'us-central1').
    """
    # Create a client for the AutoscalingPolicyService.
    # The client will automatically pick up authentication from the environment.
    client = dataproc_v1.AutoscalingPolicyServiceClient()

    # Construct the parent resource name for the request.
    # This specifies the project and region where policies are to be listed.
    parent = f"projects/{project_id}/regions/{location}"

    try:
        # Create a ListAutoscalingPoliciesRequest object.
        request = dataproc_v1.ListAutoscalingPoliciesRequest(parent=parent)

        # Make the API call to list autoscaling policies.
        # The response is a pager, allowing iteration over all policies even if they
        # span multiple pages.
        page_result = client.list_autoscaling_policies(request=request)

        print(f"Listing autoscaling policies for project '{project_id}' in region '{location}':")
        found_policies = False
        for policy in page_result:
            found_policies = True
            print(f"  Policy ID: {policy.id}")
            print(f"  Policy Name: {policy.name}")
            if policy.basic_algorithm:
                print(f"    Basic Algorithm Cooldown Period: {policy.basic_algorithm.cooldown_period.seconds}s")
            print(f"    Worker Config: min_instances={policy.worker_config.min_instances}, max_instances={policy.worker_config.max_instances}")
            if policy.secondary_worker_config:
                print(f"    Secondary Worker Config: min_instances={policy.secondary_worker_config.min_instances}, max_instances={policy.secondary_worker_config.max_instances}")
            print("\n")

        if not found_policies:
            print("  No autoscaling policies found.")

    except exceptions.NotFound as e:
        print(f"Error: The specified project or region was not found.\nDetails: {e}")
        print("Please ensure the project ID and region are correct and that you have the necessary permissions.")
    except exceptions.InvalidArgument as e:
        print(f"Error: Invalid argument provided in the request.\nDetails: {e}")
        print("This might happen if the parent format is incorrect. Ensure it's 'projects/{project_id}/regions/{location}'.")
    except Exception as e:
        print(f"An unexpected error occurred: {e}")

# [END dataproc_v1_autoscalingpolicyservice_autoscalingpolicies_list]

if __name__ == "__main__":
    parser = argparse.ArgumentParser(
        description="Lists autoscaling policies in a Dataproc project and region."
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
        help="The Google Cloud region (e.g., 'us-central1').",
    )
    args = parser.parse_args()

    list_autoscaling_policies_sample(args.project_id, args.location)
