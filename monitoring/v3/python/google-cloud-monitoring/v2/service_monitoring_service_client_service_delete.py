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

# [START monitoring_v3_servicemonitoringservice_service_delete]
from google.api_core import exceptions
from google.cloud import monitoring_v3


def delete_monitoring_service(
    project_id: str,
    service_id: str,
) -> None:
    """
    Deletes a Monitoring Service.

    Args:
        project_id: The Google Cloud project ID.
        service_id: The ID of the service to delete.
    """
    client = monitoring_v3.ServiceMonitoringServiceClient()
    service_name = client.service_path(project_id, service_id)

    try:
        client.delete_service(name=service_name)
        print(f"Successfully deleted service: {service_name}")
    except exceptions.NotFound:
        print(f"Service {service_name} not found. It may have already been deleted.")
    except exceptions.GoogleAPICallError as e:
        print(f"Failed to delete service {service_name} due to an API error: {e}")


# [END monitoring_v3_servicemonitoringservice_service_delete]

if __name__ == "__main__":
    parser = argparse.ArgumentParser(
        description="Deletes a Google Cloud Monitoring Service."
    )
    parser.add_argument(
        "--project_id",
        type=str,
        required=True,
        help="Your Google Cloud project ID.",
    )
    parser.add_argument(
        "--service_id",
        type=str,
        required=True,
        help="The ID of the Monitoring Service to delete (e.g., 'my-custom-service').",
    )

    args = parser.parse_args()
    delete_monitoring_service(args.project_id, args.service_id)
