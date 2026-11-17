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

# [START monitoring_v3_metricservice_timeseries_create]
import time

from google.api import metric_pb2
import google.api_core.exceptions
from google.cloud import monitoring_v3


def create_time_series(project_id: str) -> None:
    """Writes a single data point to a custom time series metric.

    Args:
        project_id: The Google Cloud project ID where the time series data is written.
    """
    client = monitoring_v3.MetricServiceClient()
    name = f"projects/{project_id}"

    timestamp_seconds = int(time.time())
    interval = monitoring_v3.TimeInterval(
        end_time={"seconds": timestamp_seconds},
        start_time={"seconds": timestamp_seconds},
    )
    point = monitoring_v3.Point(
        interval=interval,
        value=monitoring_v3.TypedValue(double_value=3.14),
    )

    series = monitoring_v3.TimeSeries()
    series.metric.type = "custom.googleapis.com/example_metric"
    series.metric.labels["environment"] = "production"
    series.resource.type = "global"
    series.resource.labels["project_id"] = project_id
    series.metric_kind = metric_pb2.MetricDescriptor.MetricKind.GAUGE
    series.value_type = metric_pb2.MetricDescriptor.ValueType.DOUBLE
    series.points = [point]

    time_series = [series]

    try:
        client.create_time_series(name=name, time_series=time_series)
        print(f"Successfully wrote time series data to {name}.")
    except google.api_core.exceptions.GoogleAPICallError as error:
        print(f"Failed to write time series data: {error}")
# [END monitoring_v3_metricservice_timeseries_create]
