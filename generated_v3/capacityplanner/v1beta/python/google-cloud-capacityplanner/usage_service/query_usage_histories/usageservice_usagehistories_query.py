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

# [START capacityplanner_v1beta_usageservice_query_usage_histories]
import google.api_core.exceptions
from google.cloud import capacityplanner_v1beta

client = capacityplanner_v1beta.UsageServiceClient()


def query_usage_histories(project_id: str, location_id: str) -> None:
    """Query usage histories for a specific resource type in a location.

    Args:
        project_id: The Google Cloud project ID (for example, 'example-project-id').
        location_id: The Google Cloud region where the service is located (for example, 'us-central1').
    """
    parent = f"projects/{project_id}/locations/{location_id}"
    cloud_resource_type = "gce-vcpus"

    request = capacityplanner_v1beta.QueryUsageHistoriesRequest(
        parent=parent,
        cloud_resource_type=cloud_resource_type,
    )

    try:
        response = client.query_usage_histories(request=request)
        for usage_history in response.usage_histories:
            print(f"Usage history: {usage_history}")
    except google.api_core.exceptions.GoogleAPICallError as e:
        print(f"Query failed: {e}")
# [END capacityplanner_v1beta_usageservice_query_usage_histories]
