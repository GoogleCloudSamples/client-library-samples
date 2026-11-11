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

# [START servicedirectory_v1_registrationservice_service_update]
import google.api_core.exceptions
from google.cloud import servicedirectory_v1
from google.protobuf import field_mask_pb2

client = servicedirectory_v1.RegistrationServiceClient()


def update_service(
    project_id: str, location_id: str, namespace_id: str, service_id: str
) -> None:
    """Updates an existing Service Directory service.

    Args:
        project_id: The Google Cloud project ID.
        location_id: The Google Cloud region or location ID (for example,
          'us-central1').
        namespace_id: The ID of the parent namespace.
        service_id: The ID of the service to update.
    """
    service_name = (
        f"projects/{project_id}/locations/{location_id}/"
        f"namespaces/{namespace_id}/services/{service_id}"
    )
    service = servicedirectory_v1.Service(
        name=service_name,
        annotations={"traffic-type": "internal"},
    )
    update_mask = field_mask_pb2.FieldMask(paths=["annotations"])

    try:
        response = client.update_service(
            service=service, update_mask=update_mask
        )
        print(f"Updated service: {response.name}")
    except google.api_core.exceptions.GoogleAPICallError as error:
        print(f"API call failed: {error}")
# [END servicedirectory_v1_registrationservice_service_update]
