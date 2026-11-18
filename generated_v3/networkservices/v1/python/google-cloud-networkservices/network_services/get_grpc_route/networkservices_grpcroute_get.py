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

# [START networkservices_v1_networkservices_grpcroute_get]
import google.api_core.exceptions
from google.cloud import network_services_v1


def get_grpc_route(project_id: str, location_id: str, grpc_route_id: str) -> None:
    """Retrieves a GrpcRoute resource.

    Args:
        project_id: The Google Cloud project ID (for example, 'example-project-id').
        location_id: The Google Cloud region where the service is located (for example, 'us-central1').
        grpc_route_id: ID of the GrpcRoute (for example, 'example-grpcroute-id').
    """
    client = network_services_v1.NetworkServicesClient()

    name = client.grpc_route_path(project_id, location_id, grpc_route_id)

    try:
        response = client.get_grpc_route(name=name)
        print(f"Retrieved GrpcRoute: {response.name}")
    except google.api_core.exceptions.GoogleAPICallError as e:
        print(f"Failed to retrieve GrpcRoute: {e}")
# [END networkservices_v1_networkservices_grpcroute_get]
