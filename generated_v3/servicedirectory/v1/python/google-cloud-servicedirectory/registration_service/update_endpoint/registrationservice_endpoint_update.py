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

# [START servicedirectory_v1_registrationservice_endpoint_update]
import google.api_core.exceptions
from google.cloud import servicedirectory_v1
from google.protobuf import field_mask_pb2

client = servicedirectory_v1.RegistrationServiceClient()


def update_endpoint(
    project_id: str,
    location_id: str,
    namespace_id: str,
    service_id: str,
    endpoint_id: str,
) -> None:
    """Updates an existing endpoint in a Service Directory service.

    Args:
        project_id: The Google Cloud project ID.
        location_id: The Google Cloud region or location of the Service Directory namespace.
        namespace_id: The caller-specified identifier of the Service Directory namespace.
        service_id: The caller-specified identifier of the Service Directory service.
        endpoint_id: The caller-specified identifier of the endpoint to update.
    """
    endpoint_name = (
        f"projects/{project_id}/locations/{location_id}/"
        f"namespaces/{namespace_id}/services/{service_id}/endpoints/{endpoint_id}"
    )

    update_mask = field_mask_pb2.FieldMask(paths=["annotations"])
    endpoint = servicedirectory_v1.Endpoint(
        name=endpoint_name,
        annotations={"environment": "production"},
    )

    try:
        response = client.update_endpoint(
            endpoint=endpoint,
            update_mask=update_mask,
        )
        print(f"Updated endpoint: {response.name}")
    except google.api_core.exceptions.GoogleAPICallError as error:
        print(f"Failed to update endpoint: {error}")
# [END servicedirectory_v1_registrationservice_endpoint_update]
