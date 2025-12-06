# Copyright 2025 Google LLC
#
# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at
#
#     https://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.

import argparse

# [START monitoring_v3_servicemonitoringservice_service_get]
from google.api_core import exceptions
from google.cloud import monitoring_v3


def get_monitoring_service(
    project_id: str,
    service_id: str,
) -> None:
    """
    Retrieves a specific Service Monitoring service by its ID.

    Args:
        project_id: The Google Cloud project ID.
        service_id: The ID of the service to retrieve.
    """
    client = monitoring_v3.ServiceMonitoringServiceClient()
    name = client.service_path(project_id, service_id)

    try:
        service = client.get_service(name=name)
        print(f"Service: {service.name}")
        print(f"Display Name: {service.display_name}")
        if service.custom:
            print("Service Type: Custom")
        elif service.app_engine:
            print(
                f"Service Type: App Engine, Module ID: {service.app_engine.module_id}"
            )
        elif service.cloud_endpoints:
            print(
                f"Service Type: Cloud Endpoints, Service: {service.cloud_endpoints.service}"
            )

    except exceptions.NotFound:
        print(f"Service '{service_id}' not found under project '{project_id}'.")
        print("Please ensure the service ID is correct and the service exists.")
    except exceptions.GoogleAPICallError as e:
        print(f"Failed to retrieve service '{service_id}'. Error: {e}")
        print("Check your project ID, permissions, and network connectivity.")


# [END monitoring_v3_servicemonitoringservice_service_get]

if __name__ == "__main__":
    parser = argparse.ArgumentParser(
        description="Retrieves a specific Service Monitoring service."
    )
    parser.add_argument(
        "--project_id",
        type=str,
        required=True,
        help="The Google Cloud project ID.",
    )
    parser.add_argument(
        "--service_id",
        type=str,
        required=True,
        help="The ID of the service to retrieve.",
    )
    args = parser.parse_args()
    get_monitoring_service(args.project_id, args.service_id)
