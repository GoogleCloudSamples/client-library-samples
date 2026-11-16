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

# [START run_v2_services_service_get]
import google.api_core.exceptions
from google.cloud import run_v2

client = run_v2.ServicesClient()


def get_service(project_id: str, location_id: str, service_id: str) -> None:
    """Use the get_service method

    Args:
        project_id: The Google Cloud project ID (for example, 'example-project-id')
        location_id: The Google Cloud region where the service is located (for example, 'us-central1')
        service_id: ID of the Service (for example, 'example-service-id')
    """
    name = client.service_path(project_id, location_id, service_id)

    request = run_v2.GetServiceRequest(
        name=name,
    )

    try:
        response = client.get_service(request=request)
        print(f"Service retrieved: {response.name}")
        print(f"Service URL: {response.uri}")
    except google.api_core.exceptions.NotFound:
        print(f"Service '{service_id}' was not found in location '{location_id}'.")
    except google.api_core.exceptions.GoogleAPICallError as e:
        print(f"API call failed: {e}")


# [END run_v2_services_service_get]
