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

# [START dataproc_v1_autoscalingpolicyservice_autoscalingpolicy_delete]
from google.api_core import exceptions
from google.cloud import dataproc_v1


def delete_autoscaling_policy(
    project_id: str,
    location: str,
    policy_id: str,
) -> None:
    """
    Deletes an autoscaling policy in Google Cloud Dataproc.

    This sample demonstrates how to delete an existing autoscaling policy.
    It's important to note that an autoscaling policy currently in use by
    one or more clusters cannot be deleted. If the policy does not exist,
    a `NotFound` error will be handled.

    Args:
        project_id: The Google Cloud project ID.
        location: The Google Cloud location where the autoscaling policy is located
            (e.g., 'global').
        policy_id: The ID of the autoscaling policy to delete.
            Example: 'my-autoscaling-policy'.
    """
    client = dataproc_v1.AutoscalingPolicyServiceClient()

    name = client.autoscaling_policy_path(project_id, location, policy_id)

    request = dataproc_v1.DeleteAutoscalingPolicyRequest(name=name)

    try:
        client.delete_autoscaling_policy(request=request)
        print(
            f"Autoscaling policy '{policy_id}' in location '{location}' deleted successfully."
        )
    except exceptions.NotFound:
        print(
            f"Error: Autoscaling policy '{policy_id}' not found in location '{location}'. "
            "Please check the policy ID and location."
        )
    except exceptions.GoogleAPICallError as e:
        print(f"Error deleting autoscaling policy '{policy_id}': {e}")


# [END dataproc_v1_autoscalingpolicyservice_autoscalingpolicy_delete]

if __name__ == "__main__":
    parser = argparse.ArgumentParser(
        description="Deletes a Dataproc autoscaling policy."
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
        help="The Google Cloud location (e.g., 'global').",
    )
    parser.add_argument(
        "--policy_id",
        type=str,
        required=True,
        help="The ID of the autoscaling policy to delete.",
    )
    args = parser.parse_args()

    delete_autoscaling_policy(args.project_id, args.location, args.policy_id)
