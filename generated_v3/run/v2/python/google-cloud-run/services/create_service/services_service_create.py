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

# [START run_v2_services_service_create]
import google.api_core.exceptions
from google.cloud import run_v2

client = run_v2.ServicesClient()


def create_service(project_id: str, location_id: str, service_id: str) -> None:
    """Creates a Cloud Run service.

    Args:
        project_id: The Google Cloud project ID (for example, 'example-project-id')
        location_id: The Google Cloud region where the service is located (for example, 'us-central1')
        service_id: ID of the Service (for example, 'example-service-id')
    """
    parent = f"projects/{project_id}/locations/{location_id}"

    container = run_v2.Container(
        image="us-docker.pkg.dev/cloudrun/container/hello"
    )
    template = run_v2.RevisionTemplate(containers=[container])
    service = run_v2.Service(template=template)

    try:
        operation = client.create_service(
            parent=parent,
            service=service,
            service_id=service_id,
        )
        response = operation.result()
        print(f"Created service: {response.name}")
        print(f"Service URI: {response.uri}")
    except google.api_core.exceptions.GoogleAPICallError as e:
        print(f"API call failed: {e}")
    except google.api_core.exceptions.RetryError as e:
        print(f"Retry error occurred: {e}")
# [END run_v2_services_service_create]
