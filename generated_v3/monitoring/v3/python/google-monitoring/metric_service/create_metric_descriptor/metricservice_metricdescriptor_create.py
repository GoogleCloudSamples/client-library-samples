# Copyright 2026 Google LLC
#
# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at
#
#     http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.

# [START monitoring_v3_metricservice_metricdescriptor_create]
import google.api_core.exceptions
from google.api import metric_pb2
from google.cloud import monitoring_v3


def create_metric_descriptor(project_id: str) -> None:
    """Creates a custom metric descriptor in Cloud Monitoring.

    Args:
        project_id: The Google Cloud project ID on which to execute the request.
    """
    client = monitoring_v3.MetricServiceClient()

    name = f"projects/{project_id}"
    metric_descriptor = metric_pb2.MetricDescriptor(
        type="custom.googleapis.com/example_gauge_metric",
        metric_kind=metric_pb2.MetricDescriptor.MetricKind.GAUGE,
        value_type=metric_pb2.MetricDescriptor.ValueType.DOUBLE,
        display_name="Example Gauge Metric",
        description="An example custom gauge metric tracking double values.",
    )

    try:
        response = client.create_metric_descriptor(
            name=name,
            metric_descriptor=metric_descriptor,
        )
        print(f"Created metric descriptor: {response.name}")
        print(f"Metric type: {response.type}")
    except google.api_core.exceptions.GoogleAPICallError as error:
        print(f"Failed to create metric descriptor: {error}")
# [END monitoring_v3_metricservice_metricdescriptor_create]
