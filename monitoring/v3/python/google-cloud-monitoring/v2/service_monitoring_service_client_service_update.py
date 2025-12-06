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

# [START monitoring_v3_servicemonitoringservice_service_update]
from google.api_core import exceptions
from google.cloud import monitoring_v3


def update_service(project_id: str, service_id: str) -> None:
    """Updates an existing Service in Google Cloud Monitoring.

    Args:
        project_id: The Google Cloud project ID.
        service_id: The ID of the service to update.
    """
    client = monitoring_v3.ServiceMonitoringServiceClient()

    service_name = client.service_path(project_id, service_id)

    updated_service = monitoring_v3.Service(
        name=service_name,
        display_name=f"Updated Display Name for {service_id}",
        user_labels={
            "environment": "production",
            "owner": "dev-team",
            "last_updated_by": "python-sample",
        },
    )

    try:
        response = client.update_service(service=updated_service)

        print(f"Service: {response.name}")
        print(f"  Display Name: {response.display_name}")
        print(f"  User Labels: {response.user_labels}")
    except exceptions.NotFound:
        print(
            f"Error: Service '{service_name}' not found. "
            "Please ensure the service ID is correct and the service exists."
        )
    except Exception as e:
        print(f"An unexpected error occurred: {e}")


# [END monitoring_v3_servicemonitoringservice_service_update]

if __name__ == "__main__":
    parser = argparse.ArgumentParser(
        description="Updates an existing Service in Google Cloud Monitoring."
    )
    parser.add_argument(
        "--project_id",
        required=True,
        help="The Google Cloud project ID.",
    )
    parser.add_argument(
        "--service_id",
        required=True,
        help="The ID of the service to update.",
    )
    args = parser.parse_args()
    update_service(project_id=args.project_id, service_id=args.service_id)
