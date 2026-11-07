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

# [START servicemanagement_v1_servicemanager_servicerollout_get]
import google.api_core.exceptions
from google.cloud import servicemanagement_v1

client = servicemanagement_v1.ServiceManagerClient()


def get_service_rollout(rollout_id: str, service_name: str) -> None:
    """Retrieves a specific rollout for a managed service.

    Args:
        rollout_id: The server-generated or client-assigned ID of the rollout resource (for example, '2016-02-16r1').
        service_name: The name of the service (for example, 'example.googleapis.com').
    """
    request = servicemanagement_v1.GetServiceRolloutRequest(
        service_name=service_name,
        rollout_id=rollout_id,
    )

    try:
        response = client.get_service_rollout(request=request)
        print(f"Rollout ID: {response.rollout_id}")
        print(f"Status: {response.status}")
        print(f"Created by: {response.created_by}")
    except google.api_core.exceptions.GoogleAPICallError as error:
        print(f"Failed to retrieve rollout: {error.message}")
# [END servicemanagement_v1_servicemanager_servicerollout_get]
