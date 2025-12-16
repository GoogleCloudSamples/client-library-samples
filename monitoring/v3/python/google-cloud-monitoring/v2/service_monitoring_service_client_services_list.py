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

from google.api_core import exceptions
from google.cloud import monitoring_v3


def list_services(project_id: str) -> None:
    """Lists all monitoring services for a Google Cloud project.

    Args:
        project_id: The Google Cloud project ID to list services from.
    """
    client = monitoring_v3.ServiceMonitoringServiceClient()
    parent = f"projects/{project_id}"

    try:
        page_result = client.list_services(parent=parent)

        services_found = False
        for service in page_result:
            services_found = True
            print(f"Service Name: {service.name}")
            if service.display_name:
                print(f"  Display Name: {service.display_name}")

        if not services_found:
            print(f"No monitoring services found for project: {project_id}.")

    except exceptions.NotFound:
        print(
            f"Error: Project '{project_id}' not found or inaccessible. "
            "Please ensure the project ID is correct and you have the necessary permissions."
        )
    except exceptions.PermissionDenied:
        print(
            f"Error: Permission denied to list services for project '{project_id}'. "
            "Please check if the service account or user has 'monitoring.services.list' permission."
        )
    except exceptions.GoogleAPICallError as e:
        print(f"An API error occurred: {e}")
    except Exception as e:
        print(f"An unexpected error occurred: {e}")


# [END monitoring_v3_servicemonitoringservice_services_list]


if __name__ == "__main__":
    parser = argparse.ArgumentParser(
        description="Lists all monitoring services for a Google Cloud project."
    )
    parser.add_argument(
        "--project_id",
        help="The Google Cloud project ID to list services from.",
        required=True,
    )
    args = parser.parse_args()
    list_services(project_id=args.project_id)
