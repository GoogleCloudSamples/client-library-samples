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

# [START monitoring_v3_metricservice_list_metric_descriptors]
from google.api_core import exceptions
from google.cloud import monitoring_v3


def list_metric_descriptors(project_id: str) -> None:
    """Lists metric descriptors for a given project, filtered to custom metrics.

    Args:
        project_id: The Google Cloud project ID.
    """
    client = monitoring_v3.MetricServiceClient()
    project_name = f"projects/{project_id}"

    # Example filter to list only custom metrics.
    metric_filter = 'metric.type = starts_with("custom.googleapis.com/")'

    try:
        request = monitoring_v3.ListMetricDescriptorsRequest(
            name=project_name,
            filter=metric_filter,
            page_size=10,
        )

        page_result = client.list_metric_descriptors(request=request)

        print(f"Listing custom metric descriptors for project: {project_id}")
        found_metrics = False
        for metric_descriptor in page_result:
            found_metrics = True
            print(f"  Metric Type: {metric_descriptor.type}")
            print(f"  Display Name: {metric_descriptor.display_name}")
            print(f"  Details: {metric_descriptor}")
            print("-" * 20)

        if not found_metrics:
            print("No custom metric descriptors found matching the filter.")

    except exceptions.InvalidArgument as e:
        print(
            f"Error: Invalid argument provided. Please check the project ID and filter format."
        )
        print(f"Details: {e}")
    except exceptions.PermissionDenied as e:
        print(
            f"Error: Permission denied. Ensure the service account has 'monitoring.metricDescriptors.list' permission for project '{project_id}'."
        )
        print(f"Details: {e}")
    except exceptions.GoogleAPICallError as e:
        print(f"An API error occurred: {e}")
    except Exception as e:
        print(f"An unexpected error occurred: {e}")


# [END monitoring_v3_metricservice_list_metric_descriptors]

if __name__ == "__main__":
    parser = argparse.ArgumentParser(
        description="Lists metric descriptors for a Google Cloud project."
    )
    parser.add_argument(
        "--project_id", required=True, help="The Google Cloud project ID."
    )
    args = parser.parse_args()
    list_metric_descriptors(project_id=args.project_id)
