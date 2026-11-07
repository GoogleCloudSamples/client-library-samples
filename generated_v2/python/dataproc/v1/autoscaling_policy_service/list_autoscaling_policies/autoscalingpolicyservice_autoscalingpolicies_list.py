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

# [START dataproc_v1_autoscalingpolicyservice_autoscalingpolicies_list]
import google.api_core.exceptions
from google.cloud import dataproc_v1


def list_autoscaling_policies(project_id: str, region_id: str) -> None:
    """Lists autoscaling policies in a Google Cloud project and region.

    Args:
        project_id: The Google Cloud project ID (for example,
          'example-project-id').
        region_id: The Google Cloud region where the service is located (for
          example, 'us-central1').
    """
    endpoint = (
        f"{region_id}-dataproc.googleapis.com:443"
        if region_id != "global"
        else "dataproc.googleapis.com:443"
    )
    client = dataproc_v1.AutoscalingPolicyServiceClient(
        client_options={"api_endpoint": endpoint}
    )

    parent = f"projects/{project_id}/regions/{region_id}"

    request = dataproc_v1.ListAutoscalingPoliciesRequest(
        parent=parent,
    )

    try:
        page_result = client.list_autoscaling_policies(request=request)
        for policy in page_result:
            print(f"Policy ID: {policy.id}")
            print(f"Resource name: {policy.name}")
    except google.api_core.exceptions.GoogleAPICallError as error:
        print(f"Failed to list autoscaling policies: {error}")
# [END dataproc_v1_autoscalingpolicyservice_autoscalingpolicies_list]
