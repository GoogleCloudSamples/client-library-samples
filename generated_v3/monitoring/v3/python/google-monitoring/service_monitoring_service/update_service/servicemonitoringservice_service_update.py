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

# [START monitoring_v3_servicemonitoringservice_service_update]
import google.api_core.exceptions
from google.cloud import monitoring_v3
from google.protobuf import field_mask_pb2


def update_service(project_id: str, service_id: str) -> None:
    """Update a Cloud Monitoring service.

    Args:
        project_id: The Google Cloud project ID.
        service_id: The ID of the Service to update.
    """
    client = monitoring_v3.ServiceMonitoringServiceClient()

    service = monitoring_v3.Service(
        name=f"projects/{project_id}/services/{service_id}",
        display_name="Updated Custom Service",
    )
    update_mask = field_mask_pb2.FieldMask(paths=["display_name"])
    request = monitoring_v3.UpdateServiceRequest(
        service=service,
        update_mask=update_mask,
    )

    try:
        response = client.update_service(request=request)
        print(f"Updated service: {response.name}")
        print(f"Display name: {response.display_name}")
    except google.api_core.exceptions.GoogleAPICallError as e:
        print(f"Failed to update service: {e}")
# [END monitoring_v3_servicemonitoringservice_service_update]
