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

# [START monitoring_v3_metricservice_metricdescriptor_get]
import google.api_core.exceptions
from google.cloud import monitoring_v3

client = monitoring_v3.MetricServiceClient()


def get_metric_descriptor(metric_descriptor_id: str, project_id: str) -> None:
    """Use the get_metric_descriptor method

    Args:
        metric_descriptor_id: The metric descriptor identifier (for example,
          'compute.googleapis.com/instance/disk/read_bytes_count' or
          'custom.googleapis.com/my_metric').
        project_id: The Google Cloud project ID.
    """
    name = f"projects/{project_id}/metricDescriptors/{metric_descriptor_id}"

    try:
        descriptor = client.get_metric_descriptor(name=name)
        print(f"Metric descriptor resource name: {descriptor.name}")
        print(f"Metric type: {descriptor.type}")
        print(f"Metric kind: {descriptor.metric_kind}")
        print(f"Value type: {descriptor.value_type}")
        print(f"Description: {descriptor.description}")
    except google.api_core.exceptions.GoogleAPICallError as error:
        print(f"API error encountered while retrieving metric descriptor: {error}")
# [END monitoring_v3_metricservice_metricdescriptor_get]
