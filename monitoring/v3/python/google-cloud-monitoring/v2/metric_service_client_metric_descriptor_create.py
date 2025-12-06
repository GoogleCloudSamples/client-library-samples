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

# [START monitoring_v3_metricservice_create_metric_descriptor]
from google.api.metric_pb2 import LabelDescriptor, MetricDescriptor
from google.api_core import exceptions
from google.cloud import monitoring_v3


def create_custom_metric(project_id: str) -> None:
    """
    Creates a new custom metric descriptor for a Google Cloud project.


    Args:
        project_id: The Google Cloud project ID where the metric will be created.
    """
    client = monitoring_v3.MetricServiceClient()
    project_name = f"projects/{project_id}"

    metric_type = "custom.googleapis.com/my_app/request_count"
    metric_descriptor = MetricDescriptor(
        type=metric_type,
        metric_kind=MetricDescriptor.MetricKind.GAUGE,
        value_type=MetricDescriptor.ValueType.INT64,
        description="Total number of requests processed by my application.",
        display_name="Application Request Count",
        labels=[
            LabelDescriptor(
                key="environment",
                value_type=LabelDescriptor.ValueType.STRING,
                description="The environment where the request was processed (e.g., 'prod', 'dev').",
            ),
            LabelDescriptor(
                key="method",
                value_type=LabelDescriptor.ValueType.STRING,
                description="The API method called (e.g., 'GET', 'POST').",
            ),
        ],
    )

    try:
        created_metric = client.create_metric_descriptor(
            name=project_name,
            metric_descriptor=metric_descriptor,
        )
        print(f"Metric Descriptor: {created_metric.name}")
        print(f"  Description: {created_metric.description}")
        print(f"  Labels: {[label.key for label in created_metric.labels]}")
        print(f"  Type: {created_metric.type}")
    except exceptions.AlreadyExists as e:
        print(f"Metric '{metric_type}' already exists for project '{project_id}'.")
        print(
            "Consider updating the existing metric if changes are needed, or choose a unique metric type."
        )
        # You can retrieve the existing metric descriptor if needed:
        # existing_metric = client.get_metric_descriptor(name=f"{project_name}/metricDescriptors/{metric_type}")
        # print(f"Existing metric name: {existing_metric.name}")
    except Exception as e:
        print(f"An error occurred: {e}")


# [END monitoring_v3_metricservice_create_metric_descriptor]

if __name__ == "__main__":
    parser = argparse.ArgumentParser(
        description="Create a custom metric descriptor in Google Cloud Monitoring."
    )
    parser.add_argument(
        "--project_id", help="The Google Cloud project ID.", required=True
    )
    args = parser.parse_args()
    create_custom_metric(project_id=args.project_id)
