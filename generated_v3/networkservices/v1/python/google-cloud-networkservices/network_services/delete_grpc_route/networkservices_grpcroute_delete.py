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

# [START networkservices_v1_networkservices_grpcroute_delete]
from google.api_core import exceptions
from google.cloud import network_services_v1


def delete_grpc_route(
    project_id: str, location_id: str, grpc_route_id: str
) -> None:
    """Deletes an existing GrpcRoute resource.

    Args:
        project_id: The Google Cloud project ID (for example,
          'example-project-id').
        location_id: The Google Cloud region or 'global' where the GrpcRoute is
          located (for example, 'global' or 'us-central1').
        grpc_route_id: The identifier of the GrpcRoute to delete (for example,
          'example-grpcroute-id').
    """
    client = network_services_v1.NetworkServicesClient()

    name = (
        f"projects/{project_id}/locations/{location_id}/grpcRoutes/"
        f"{grpc_route_id}"
    )

    try:
        operation = client.delete_grpc_route(name=name)
        operation.result()
        print(f"Deleted GrpcRoute: {name}")
    except exceptions.GoogleAPICallError as error:
        print(f"Failed to delete GrpcRoute: {error}")
# [END networkservices_v1_networkservices_grpcroute_delete]
