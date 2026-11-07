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

# [START servicedirectory_v1_lookupservice_resolve_service]
import google.api_core.exceptions
from google.cloud import servicedirectory_v1

client = servicedirectory_v1.LookupServiceClient()


def resolve_service(
    project_id: str, location_id: str, namespace_id: str, service_id: str
) -> None:
    """Resolve a Service Directory service to obtain registered endpoints.

    Args:
        project_id: The Google Cloud project ID hosting the service.
        location_id: The Google Cloud region where the namespace and service reside.
        namespace_id: The caller-chosen ID of the Service Directory namespace.
        service_id: The caller-chosen ID of the Service Directory service to resolve.
    """
    name = (
        f"projects/{project_id}/locations/{location_id}/"
        f"namespaces/{namespace_id}/services/{service_id}"
    )

    request = servicedirectory_v1.ResolveServiceRequest(
        name=name,
    )

    try:
        response = client.resolve_service(request=request)
        print(f"Resolved service: {response.service.name}")
        for endpoint in response.service.endpoints:
            print(
                f"Endpoint: {endpoint.name}, Address: {endpoint.address}:{endpoint.port}"
            )
    except google.api_core.exceptions.GoogleAPICallError as error:
        print(f"API call failed: {error.message}")
# [END servicedirectory_v1_lookupservice_resolve_service]
