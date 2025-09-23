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

# [START monitoring_v3_servicemonitoringservice_create_service]
from google.api_core import exceptions
from google.cloud import monitoring_v3


def create_service(
    project_id: str,
    service_id: str,
) -> None:
    """Create a new Service in Google Cloud Monitoring.

    Args:
        project_id: The Google Cloud project ID.
        service_id: The user-defined ID for the service (e.g., 'my-app-service'). Must be unique and match `[a-z0-9-]+`.
    """
    client = monitoring_v3.ServiceMonitoringServiceClient()

    parent = f"projects/{project_id}"

    # Define the service to be created. For this example, we create a custom service.
    # Other service types (e.g., App Engine, GKE) have specific configurations.
    service = monitoring_v3.Service(
        display_name="My Example Service",
        custom=monitoring_v3.Service.Custom(),  # Using a custom service type
    )

    request = monitoring_v3.CreateServiceRequest(
        parent=parent,
        service=service,
        service_id=service_id,
    )

    try:
        response = client.create_service(request=request)
        print(f"Service: {response.name}")
        print(f"	Display Name: {response.display_name}")
    except exceptions.AlreadyExists as e:
        print(
            f"Error: Service '{service_id}' already exists in project '{project_id}'. "
            f"Please choose a different service_id or delete the existing service. Details: {e}"
        )
    except Exception as e:
        print(f"An unexpected error occurred: {e}")


# [END monitoring_v3_servicemonitoringservice_create_service]

if __name__ == "__main__":
    parser = argparse.ArgumentParser(
        description="Create a new Service in Google Cloud Monitoring."
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
        help="The ID for the service.",
    )

    args = parser.parse_args()

    create_service(project_id=args.project_id, service_id=args.service_id)
