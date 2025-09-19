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

# [START dataproc_v1_autoscalingpolicyservice_autoscalingpolicy_create]
from google.api_core import exceptions
from google.cloud import dataproc_v1
from google.protobuf import duration_pb2


def create_autoscaling_policy(project_id: str, location: str, policy_id: str) -> None:
    """Creates a new autoscaling policy for Dataproc.

    This sample demonstrates how to create a basic autoscaling policy
    that can be attached to a Dataproc cluster to automatically adjust
    the number of worker nodes based on YARN resource utilization.

    Args:
        project_id: The Google Cloud project ID.
        location: The Google Cloud region where the policy will be created
            (e.g., 'global').
        policy_id: The ID of the autoscaling policy to create.
            Must contain only letters (a-z, A-Z), numbers (0-9),
            underscores (_), and hyphens (-). Cannot begin or end with
            underscore or hyphen. Must consist of between 3 and 50 characters.
    """
    client = dataproc_v1.AutoscalingPolicyServiceClient()

    # Dataproc autoscaling policies are regional resources.
    parent = f"projects/{project_id}/regions/{location}"

    # Configure the basic autoscaling algorithm for YARN.
    # This example sets a graceful decommissioning timeout of 30 minutes
    # and scaling factors for both scale-up and scale-down.
    yarn_config = dataproc_v1.BasicYarnAutoscalingConfig(
        graceful_decommission_timeout=duration_pb2.Duration(seconds=1800),
        scale_up_factor=0.5,
        scale_down_factor=0.5,
    )

    basic_algorithm = dataproc_v1.BasicAutoscalingAlgorithm(
        yarn_config=yarn_config,
        cooldown_period=duration_pb2.Duration(seconds=120),  # 2 minutes
    )

    # This configuration balances cost and performance, ensuring there's always
    # baseline capacity ready to handle small, frequent jobs (min_instances=2)
    # while also setting a maximum to prevent excessive costs (max_instances=10).
    worker_config = dataproc_v1.InstanceGroupAutoscalingPolicyConfig(
        min_instances=2,
        max_instances=10,
    )

    # Configure the AutoscalingPolicy on *how* to scale and *how much* to scale.
    #
    # - 'basic_algorithm' defines the "RULES" for scaling, i.e. *when* to add or
    #   remove nodes (e.g., "scale up if YARN pending memory is high for 2 minutes").
    #
    # - 'worker_config' sets the "BOUNDARIES" for the number of primary workers.
    policy = dataproc_v1.AutoscalingPolicy(
        id=policy_id,
        basic_algorithm=basic_algorithm,
        worker_config=worker_config,
        labels={"environment": "development", "purpose": "example"},
    )

    request = dataproc_v1.CreateAutoscalingPolicyRequest(
        parent=parent,
        policy=policy,
    )

    try:
        # Make the request
        response = client.create_autoscaling_policy(request=request)
        print(f"Autoscaling policy '{response.id}' created successfully.")
        print(f"Policy Name: {response.name}")
        print(f"Worker config max instances: {response.worker_config.max_instances}")
        print(
            f"YARN scale up factor: {response.basic_algorithm.yarn_config.scale_up_factor}"
        )
    except exceptions.AlreadyExists as e:
        print(f"Error: Autoscaling policy '{policy_id}' already exists in {parent}.")
        print(f"Please use a different policy ID or update the existing policy.")
    except exceptions.GoogleAPICallError as e:
        print(f"An API error occurred: {e}")
        print(f"Please check your project ID, region, and permissions.")
    except Exception as e:
        print(f"An unexpected error occurred: {e}")


# [END dataproc_v1_autoscalingpolicyservice_autoscalingpolicy_create]

if __name__ == "__main__":
    parser = argparse.ArgumentParser(
        description="Creates a new Dataproc autoscaling policy."
    )
    parser.add_argument(
        "--project_id",
        required=True,
        help="The Google Cloud project ID."
    )
    parser.add_argument(
        "--location",
        required=True,
        help="The Google Cloud region where the policy will be created (e.g., 'global')."
    )
    parser.add_argument(
        "--policy_id",
        required=True,
        help="The ID of the autoscaling policy to create. "
        "Must contain only letters (a-z, A-Z), numbers (0-9), "
        "underscores (_), and hyphens (-). Cannot begin or end with "
        "underscore or hyphen. Must consist of between 3 and 50 characters.",
    )
    args = parser.parse_args()

    create_autoscaling_policy(args.project_id, args.location, args.policy_id)
