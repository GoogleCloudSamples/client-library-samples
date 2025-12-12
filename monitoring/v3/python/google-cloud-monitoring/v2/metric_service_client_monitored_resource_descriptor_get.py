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

# [START monitoring_v3_metricservice_monitoredresourcedescriptor_get]
from google.api_core import exceptions
from google.cloud import monitoring_v3


def get_monitored_resource_descriptor(
    project_id: str,
    resource_type: str,
) -> None:
    """
    Retrieves a specific monitored resource descriptor.

    Args:
        project_id: The Google Cloud project ID.
        resource_type: The type of the monitored resource descriptor to retrieve (e.g., "gce_instance").
                       The `[RESOURCE_TYPE]` is a predefined type.
    """
    client = monitoring_v3.MetricServiceClient()

    name = client.monitored_resource_descriptor_path(project_id, resource_type)

    try:
        response = client.get_monitored_resource_descriptor(name=name)

        print(f"Successfully retrieved monitored resource descriptor: {response.name}")
        print(f"  Type: {response.type}")
        print(f"  Display Name: {response.display_name}")
        print(f"  Description: {response.description}")
        print("  Labels:")
        for label in response.labels:
            print(f"    - {label.key}: {label.description}")

    except exceptions.NotFound:
        print(
            f"Error: Monitored resource descriptor '{resource_type}' not found for project '{project_id}'. "
            "Please ensure the resource type is correct and exists in the project."
        )
    except Exception as e:
        print(f"An unexpected error occurred: {e}")


# [END monitoring_v3_metricservice_monitoredresourcedescriptor_get]

if __name__ == "__main__":
    parser = argparse.ArgumentParser(
        description="Retrieves a specific monitored resource descriptor."
    )
    parser.add_argument(
        "--project_id", required=True, help="The Google Cloud project ID."
    )
    parser.add_argument(
        "--resource_type",
        default="gce_instance",
        help="The type of the monitored resource descriptor to retrieve.",
    )
    args = parser.parse_args()
    get_monitored_resource_descriptor(
        project_id=args.project_id, resource_type=args.resource_type
    )
