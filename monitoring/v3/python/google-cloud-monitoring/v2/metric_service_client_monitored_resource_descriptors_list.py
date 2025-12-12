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

# [START monitoring_v3_metricservice_monitoredresourcedescriptors_list]
from google.cloud import monitoring_v3


def list_monitored_resource_descriptors(project_id: str) -> None:
    """
    Lists all monitored resource descriptors for a Google Cloud project.

    Args:
        project_id: The Google Cloud project ID.
    """
    client = monitoring_v3.MetricServiceClient()
    name = f"projects/{project_id}"

    try:
        request = monitoring_v3.ListMonitoredResourceDescriptorsRequest(name=name)

        print(f"Listing monitored resource descriptors for project: {project_id}")

        page_result = client.list_monitored_resource_descriptors(request=request)

        found_descriptors = False
        for descriptor in page_result:
            found_descriptors = True
            print(f"  Type: {descriptor.type}")
            print(f"  Display Name: {descriptor.display_name}")
            print(f"  Description: {descriptor.description}")
            print(
                f"  Labels: {[{label.key: label.description} for label in descriptor.labels]}"
            )
            print("-" * 20)

        if not found_descriptors:
            print(f"No monitored resource descriptors found for project: {project_id}")
        else:
            print(
                f"Successfully listed monitored resource descriptors for project: {project_id}"
            )

    except exceptions.InvalidArgument as e:
        print(f"Error: Invalid argument provided. Please check the project ID format.")
        print(f"Details: {e}")
        print(
            f"Ensure that '{project_id}' is a valid Google Cloud project ID (e.g., 'your-project-123')."
        )
    except exceptions.NotFound as e:
        print(
            f"Error: Project '{project_id}' not found or you do not have permission to access it."
        )
        print(f"Details: {e}")
        print(f"Please verify the project ID and your IAM permissions.")
    except Exception as e:
        print(f"An unexpected error occurred: {e}")


# [END monitoring_v3_metricservice_monitoredresourcedescriptors_list]

if __name__ == "__main__":
    parser = argparse.ArgumentParser(
        description="Lists all monitored resource descriptors for a Google Cloud project."
    )
    parser.add_argument(
        "--project_id",
        required=True,
        help="The Google Cloud project ID.",
    )
    args = parser.parse_args()
    list_monitored_resource_descriptors(project_id=args.project_id)
