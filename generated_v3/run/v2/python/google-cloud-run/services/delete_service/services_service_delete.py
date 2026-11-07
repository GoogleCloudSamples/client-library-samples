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

# [START run_v2_services_service_delete]
import google.api_core.exceptions
from google.cloud import run_v2

client = run_v2.ServicesClient()


def delete_service(project_id: str, location_id: str, service_id: str) -> None:
    """Deletes an existing Cloud Run service.

    Args:
        project_id: The Google Cloud project ID (for example, 'example-project-id').
        location_id: The Google Cloud region where the service is located (for example, 'us-central1').
        service_id: The identifier of the existing Cloud Run service to delete (for example, 'example-service').
    """
    name = f"projects/{project_id}/locations/{location_id}/services/{service_id}"

    try:
        operation = client.delete_service(name=name)
        response = operation.result()
        print(f"Deleted service: {response.name}")
    except google.api_core.exceptions.NotFound:
        print(f"Service not found: {name}")
    except google.api_core.exceptions.GoogleAPICallError as error:
        print(f"API call failed: {error.message}")
# [END run_v2_services_service_delete]
