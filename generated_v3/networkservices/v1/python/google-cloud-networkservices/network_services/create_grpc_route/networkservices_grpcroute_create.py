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

# [START networkservices_v1_networkservices_grpcroute_create]
import google.api_core.exceptions
from google.cloud import network_services_v1
from google.protobuf import duration_pb2


def create_grpc_route(project_id: str, location_id: str, grpc_route_id: str) -> None:
    """Creates a GrpcRoute in Google Cloud Network Services.

    Args:
        project_id: The Google Cloud project ID (for example,
            'example-project-id').
        location_id: The Google Cloud location where the service is located (for
            example, 'global' or 'us-central1').
        grpc_route_id: A caller-chosen unique identifier for the GrpcRoute (for
            example, 'example-grpc-route').
    """
    client = network_services_v1.NetworkServicesClient()

    parent = f"projects/{project_id}/locations/{location_id}"
    route_action = network_services_v1.GrpcRoute.RouteAction(
        timeout=duration_pb2.Duration(seconds=30)
    )
    route_rule = network_services_v1.GrpcRoute.RouteRule(action=route_action)
    grpc_route = network_services_v1.GrpcRoute(
        hostnames=["service.example.com"],
        rules=[route_rule],
    )

    try:
        operation = client.create_grpc_route(
            parent=parent,
            grpc_route_id=grpc_route_id,
            grpc_route=grpc_route,
        )
        response = operation.result()
        print(f"Created GrpcRoute: {response.name}")
    except google.api_core.exceptions.GoogleAPICallError as e:
        print(f"Failed to create GrpcRoute: {e}")
# [END networkservices_v1_networkservices_grpcroute_create]
