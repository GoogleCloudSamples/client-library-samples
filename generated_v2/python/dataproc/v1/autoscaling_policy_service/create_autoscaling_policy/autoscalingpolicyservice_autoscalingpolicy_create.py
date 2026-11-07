# Copyright 2026 Google LLC
#
# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at
#
#     http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.

# [START dataproc_v1_autoscalingpolicyservice_autoscalingpolicy_create]
import google.api_core.exceptions
from google.cloud import dataproc_v1


def create_autoscaling_policy(project_id: str, region_id: str) -> None:
    """Create an autoscaling policy in Google Cloud Dataproc.

    Args:
        project_id: The Google Cloud project ID (for example, 'example-project-id').
        region_id: The Google Cloud region where the service is located (for example, 'us-central1').
    """
    client_options = (
        {"api_endpoint": f"{region_id}-dataproc.googleapis.com:443"}
        if region_id != "global"
        else None
    )
    client = dataproc_v1.AutoscalingPolicyServiceClient(client_options=client_options)

    parent = f"projects/{project_id}/regions/{region_id}"

    yarn_config = dataproc_v1.BasicYarnAutoscalingConfig(
        graceful_decommission_timeout={"seconds": 3600},
        scale_up_factor=0.5,
        scale_down_factor=0.5,
    )
    basic_algorithm = dataproc_v1.BasicAutoscalingAlgorithm(
        yarn_config=yarn_config,
        cooldown_period={"seconds": 300},
    )
    worker_config = dataproc_v1.InstanceGroupAutoscalingPolicyConfig(
        min_instances=2,
        max_instances=10,
    )
    policy = dataproc_v1.AutoscalingPolicy(
        id="dataproc-autoscaling-policy",
        basic_algorithm=basic_algorithm,
        worker_config=worker_config,
    )

    try:
        response = client.create_autoscaling_policy(
            parent=parent,
            policy=policy,
        )
        print(f"Created autoscaling policy: {response.name}")
    except google.api_core.exceptions.AlreadyExists as err:
        print(f"Autoscaling policy already exists: {err}")
    except google.api_core.exceptions.GoogleAPICallError as err:
        print(f"Failed to create autoscaling policy: {err}")
# [END dataproc_v1_autoscalingpolicyservice_autoscalingpolicy_create]
