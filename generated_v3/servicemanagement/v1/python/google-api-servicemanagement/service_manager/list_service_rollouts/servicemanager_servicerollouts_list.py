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

# [START servicemanagement_v1_servicemanager_servicerollouts_list]
import google.api_core.exceptions
from google.cloud import servicemanagement_v1

client = servicemanagement_v1.ServiceManagerClient()


def list_service_rollouts(service_name: str) -> None:
    """List rollouts for a managed service.

    Args:
        service_name: The name of the service to list rollouts for (for example, 'example.googleapis.com').
    """
    filter = "status=SUCCESS"

    request = servicemanagement_v1.ListServiceRolloutsRequest(
        service_name=service_name,
        filter=filter,
    )

    try:
        response = client.list_service_rollouts(request=request)
        for rollout in response:
            print(f"Rollout ID: {rollout.rollout_id}")
            print(f"Status: {rollout.status}")
    except google.api_core.exceptions.GoogleAPICallError as error:
        print(f"Failed to list service rollouts: {error.message}")
# [END servicemanagement_v1_servicemanager_servicerollouts_list]
