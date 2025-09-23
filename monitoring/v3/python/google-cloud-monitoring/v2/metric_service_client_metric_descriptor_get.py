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

# [START monitoring_v3_metricservice_metricdescriptor_get]
from google.api_core import exceptions
from google.cloud import monitoring_v3


def get_metric_descriptor(project_id: str, metric_id: str) -> None:
    """Gets a specific metric descriptor for a project.

    This sample demonstrates how to retrieve a specific metric descriptor
    (schema) for a Google-managed metric type. Metric descriptors define
    the structure and metadata of a metric, including its type, kind,
    unit, and associated labels.

    Args:
        project_id: The Google Cloud project ID.
        metric_id: The ID of the metric descriptor to delete.
    """
    client = monitoring_v3.MetricServiceClient()

    name = client.metric_descriptor_path(project_id, metric_id)

    try:
        metric_descriptor = client.get_metric_descriptor(name=name)

        print(f"Metric Descriptor: {metric_descriptor.name}")
        print(f"  Description: {metric_descriptor.description}")
        print(f"  Display Name: {metric_descriptor.display_name}")
        if metric_descriptor.labels:
            print("  Labels:")
            for label in metric_descriptor.labels:
                print(f"    - Key: {label.key}, Description: {label.description}")
        print(f"  Metric Kind: {metric_descriptor.metric_kind}")
        print(f"  Type: {metric_descriptor.type}")
        print(f"  Unit: {metric_descriptor.unit}")
        print(f"  Value Type: {metric_descriptor.value_type}")

    except exceptions.NotFound:
        print(
            f"Error: Metric descriptor '{metric_id}' not found for project '{project_id}'."
        )
        print(
            "Please ensure the project ID is correct and the metric type exists and is accessible."
        )
    except Exception as e:
        print(f"An unexpected error occurred: {e}")


# [END monitoring_v3_metricservice_metricdescriptor_get]


if __name__ == "__main__":
    parser = argparse.ArgumentParser(
        description="Gets a specific metric descriptor for a Google Cloud project."
    )
    parser.add_argument(
        "--project_id",
        required=True,
        help="The Google Cloud project ID.",
    )
    parser.add_argument(
        "--metric_id",
        required=True,
        help="The ID of the metric descriptor to delete.",
    )
    args = parser.parse_args()
    get_metric_descriptor(project_id=args.project_id, metric_id=args.metric_id)
