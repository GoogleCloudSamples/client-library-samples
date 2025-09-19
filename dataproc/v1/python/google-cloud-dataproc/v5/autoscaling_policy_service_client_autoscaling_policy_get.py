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

# [START dataproc_v1_autoscalingpolicyservice_get_autoscaling_policy]
from google.api_core import exceptions
from google.cloud import dataproc_v1


def get_autoscaling_policy(
    project_id: str,
    location: str,
    policy_id: str,
) -> None:
    """
    Retrieves an autoscaling policy for a Google Cloud Dataproc cluster.

    Args:
        project_id: The Google Cloud project ID.
        location: The Google Cloud location where the policy is located (e.g., 'global').
        policy_id: The ID of the autoscaling policy to retrieve.
    """
    client = dataproc_v1.AutoscalingPolicyServiceClient()

    name = f"projects/{project_id}/locations/{location}/autoscalingPolicies/{policy_id}"

    request = dataproc_v1.GetAutoscalingPolicyRequest(name=name)

    try:
        policy = client.get_autoscaling_policy(request=request)

        print(f"Successfully retrieved autoscaling policy: {policy.name}")
        print(f"  ID: {policy.id}")
        print(
            f"  Worker config: min_instances={policy.worker_config.min_instances}, max_instances={policy.worker_config.max_instances}"
        )
        if policy.basic_algorithm and policy.basic_algorithm.yarn_config:
            print(
                f"  YARN config: scale_up_factor={policy.basic_algorithm.yarn_config.scale_up_factor}, scale_down_factor={policy.basic_algorithm.yarn_config.scale_down_factor}"
            )

    except exceptions.NotFound:
        print(
            f"Error: Autoscaling policy '{policy_id}' not found in location '{location}' for project '{project_id}'."
        )
        print(
            "Please ensure the policy ID and location are correct and the policy exists."
        )
    except Exception as e:
        print(f"An unexpected error occurred: {e}")


# [END dataproc_v1_autoscalingpolicyservice_get_autoscaling_policy]

if __name__ == "__main__":
    parser = argparse.ArgumentParser(
        description="Retrieve a Dataproc autoscaling policy."
    )
    parser.add_argument(
        "--project_id", type=str, help="Your Google Cloud Project ID.", required=True
    )
    parser.add_argument(
        "--location",
        type=str,
        help="The location where the autoscaling policy is located.",
        required=True,
    )
    parser.add_argument(
        "--policy_id",
        type=str,
        help="The ID of the autoscaling policy to retrieve.",
        required=True,
    )

    args = parser.parse_args()

    get_autoscaling_policy(args.project_id, args.location, args.policy_id)
