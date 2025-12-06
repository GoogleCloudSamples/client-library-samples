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


# [START dataproc_v1_autoscalingpolicyservice_update_autoscaling_policy]
from google.api_core.exceptions import GoogleAPICallError, NotFound
from google.cloud import dataproc_v1
from google.protobuf import duration_pb2


def update_autoscaling_policy(project_id: str, location: str, policy_id: str) -> None:
    """
    Updates an existing Dataproc autoscaling policy.

    This sample demonstrates how to modify an autoscaling policy, for example,
    to adjust the maximum number of worker instances or change the scaling
    behavior. The update operation performs a full replacement of the policy.

    Args:
        project_id: The Google Cloud project ID.
        location: The Google Cloud region or location (e.g., "us-central1").
        policy_id: The ID of the autoscaling policy to update (e.g., "my-policy-123").
    """
    client = dataproc_v1.AutoscalingPolicyServiceClient()

    policy_name = client.autoscaling_policy_path(
        project=project_id, location=location, autoscaling_policy=policy_id
    )

    # Define the updated autoscaling policy.
    # For an update, you must provide the complete policy object, including
    # all required fields, even if they are not being changed.
    updated_policy = dataproc_v1.AutoscalingPolicy(
        name=policy_name,
        id=policy_id,
        basic_algorithm=dataproc_v1.BasicAutoscalingAlgorithm(
            yarn_config=dataproc_v1.BasicYarnAutoscalingConfig(
                scale_up_factor=0.8,
                # These are required fields for BasicYarnAutoscalingConfig,
                # so they must be provided even if not explicitly changed.
                scale_down_factor=0.5,
                graceful_decommission_timeout=duration_pb2.Duration(seconds=3600),
            ),
            cooldown_period=duration_pb2.Duration(seconds=120),
        ),
        worker_config=dataproc_v1.InstanceGroupAutoscalingPolicyConfig(
            min_instances=2,
            max_instances=20,
        ),
        labels={"environment": "production", "updated_by": "sample"},
    )

    try:
        response = client.update_autoscaling_policy(policy=updated_policy)

        print(f"Autoscaling policy '{response.name}' updated successfully.")
        print(f"  Policy ID: {response.id}")
        print(f"  New Max Worker Instances: {response.worker_config.max_instances}")
        print(
            f"  New YARN Scale Up Factor: {response.basic_algorithm.yarn_config.scale_up_factor}"
        )
        print(f"  Updated Labels: {response.labels}")

    except NotFound:
        print(
            f"Error: Autoscaling policy '{policy_name}' not found. "
            "Please ensure the policy ID and location are correct."
        )
    except GoogleAPICallError as e:
        print(f"Error updating autoscaling policy: {e}")
    except Exception as e:
        print(f"An unexpected error occurred: {e}")


# [END dataproc_v1_autoscalingpolicyservice_update_autoscaling_policy]

if __name__ == "__main__":
    parser = argparse.ArgumentParser(
        description="Updates an existing Dataproc autoscaling policy."
    )
    parser.add_argument(
        "--project_id",
        required=True,
        help="The Google Cloud project ID."
    )
    parser.add_argument(
        "--location",
        required=True,
        help="The Google Cloud region or location (e.g., 'us-central1').",
    )
    parser.add_argument(
        "--policy_id",
        required=True,
        help="The ID of the autoscaling policy to update (e.g., 'my-policy-123').",
    )
    args = parser.parse_args()

    update_autoscaling_policy(args.project_id, args.location, args.policy_id)
