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

# [START monitoring_v3_metricservice_metricdescriptor_delete]
import google.api_core.exceptions
from google.cloud import monitoring_v3

client = monitoring_v3.MetricServiceClient()


def delete_metric_descriptor(metric_descriptor_id: str, project_id: str) -> None:
    """Deletes a custom metric descriptor.

    Args:
        metric_descriptor_id: The custom metric descriptor identifier to delete
          (for example, 'custom.googleapis.com/my_test_metric').
        project_id: The Google Cloud project ID containing the metric
          descriptor.
    """
    name = f"projects/{project_id}/metricDescriptors/{metric_descriptor_id}"

    try:
        client.delete_metric_descriptor(name=name)
        print(f"Deleted metric descriptor: {name}")
    except google.api_core.exceptions.NotFound:
        print(f"Metric descriptor not found: {name}")
    except google.api_core.exceptions.GoogleAPICallError as error:
        print(f"Failed to delete metric descriptor: {error}")


# [END monitoring_v3_metricservice_metricdescriptor_delete]
