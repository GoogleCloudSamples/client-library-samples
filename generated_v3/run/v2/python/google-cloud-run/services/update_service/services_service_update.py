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

# [START run_v2_services_service_update]
import google.api_core.exceptions
from google.cloud import run_v2
from google.protobuf import field_mask_pb2

client = run_v2.ServicesClient()


def update_service(project_id: str, location_id: str, service_id: str) -> None:
    """Updates an existing Cloud Run service.

    Args:
        project_id: The Google Cloud project ID hosting the Service.
        location_id: The Google Cloud region where the Service is deployed (for example, 'us-central1').
        service_id: The identifier of an existing Service to update.
    """
    service_name = f"projects/{project_id}/locations/{location_id}/services/{service_id}"
    service = run_v2.Service(
        name=service_name,
        description="Updated service description",
    )
    update_mask = field_mask_pb2.FieldMask(paths=["description"])

    request = run_v2.UpdateServiceRequest(
        service=service,
        update_mask=update_mask,
    )

    try:
        operation = client.update_service(request=request)
        response = operation.result()
        print(f"Updated service: {response.name}")
    except google.api_core.exceptions.GoogleAPICallError as e:
        print(f"Failed to update service: {e}")
# [END run_v2_services_service_update]
