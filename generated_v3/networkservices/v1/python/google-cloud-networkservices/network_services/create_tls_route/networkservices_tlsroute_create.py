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

# [START networkservices_v1_networkservices_tlsroute_create]
import google.api_core.exceptions
from google.cloud import network_services_v1


def create_tls_route(
    project_id: str,
    location_id: str,
    tls_route_id: str,
    backend_service_id: str,
) -> None:
    """Creates a TlsRoute resource.

    Args:
        project_id: The Google Cloud project ID (for example, 'example-project-id').
        location_id: The Google Cloud location (for example, 'global').
        tls_route_id: The identifier for the TlsRoute to create.
        backend_service_id: The identifier of the existing Compute Engine BackendService.
    """
    client = network_services_v1.NetworkServicesClient()

    parent = f"projects/{project_id}/locations/{location_id}"
    backend_service_path = (
        f"projects/{project_id}/global/backendServices/{backend_service_id}"
    )

    destination = network_services_v1.TlsRoute.RouteDestination(
        service_name=backend_service_path,
        weight=1,
    )
    action = network_services_v1.TlsRoute.RouteAction(
        destinations=[destination],
    )
    match_rule = network_services_v1.TlsRoute.RouteMatch(
        sni_host=["example.com"],
    )
    rule = network_services_v1.TlsRoute.RouteRule(
        matches=[match_rule],
        action=action,
    )
    tls_route = network_services_v1.TlsRoute(
        rules=[rule],
    )

    try:
        operation = client.create_tls_route(
            parent=parent,
            tls_route_id=tls_route_id,
            tls_route=tls_route,
        )
        response = operation.result()
        print(f"Created TLS route: {response.name}")
    except google.api_core.exceptions.GoogleAPICallError as exc:
        print(f"Failed to create TLS route: {exc}")


# [END networkservices_v1_networkservices_tlsroute_create]
