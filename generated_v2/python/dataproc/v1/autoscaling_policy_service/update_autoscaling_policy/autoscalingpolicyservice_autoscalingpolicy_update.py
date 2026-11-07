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

# [START dataproc_v1_autoscalingpolicyservice_autoscalingpolicy_update]
import google.api_core.exceptions
from google.cloud import dataproc_v1

client = dataproc_v1.AutoscalingPolicyServiceClient()


def update_autoscaling_policy(
    project_id: str, location_id: str, autoscaling_policy_id: str
) -> None:
    """Updates an existing Dataproc autoscaling policy.

    Args:
        project_id: The Google Cloud project ID.
        location_id: The Dataproc location or region ID (for example,
          'us-central1').
        autoscaling_policy_id: The caller-specified ID of the autoscaling policy
          to update. Must consist of 3 to 50 characters and contain only
          letters, numbers, hyphens, and underscores.
    """
    endpoint = (
        f"{location_id}-dataproc.googleapis.com:443"
        if location_id != "global"
        else "dataproc.googleapis.com:443"
    )
    client = dataproc_v1.AutoscalingPolicyServiceClient(
        client_options={"api_endpoint": endpoint}
    )

    policy_name = f"projects/{project_id}/locations/{location_id}/autoscalingPolicies/{autoscaling_policy_id}"

    try:
        # Retrieve the existing policy before updating because full replacement is required
        policy = client.get_autoscaling_policy(name=policy_name)

        # Mutate policy fields
        policy.labels["env"] = "test"
        policy.name = policy_name

        response = client.update_autoscaling_policy(policy=policy)
        print(f"Updated autoscaling policy: {response.name}")
    except google.api_core.exceptions.GoogleAPICallError as e:
        print(f"Failed to update autoscaling policy: {e}")
# [END dataproc_v1_autoscalingpolicyservice_autoscalingpolicy_update]
