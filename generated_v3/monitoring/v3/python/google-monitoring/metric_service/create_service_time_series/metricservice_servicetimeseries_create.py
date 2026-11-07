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

# [START monitoring_v3_metricservice_servicetimeseries_create]
import time

from google.api_core import exceptions
from google.cloud import monitoring_v3


def create_service_time_series(project_id: str) -> None:
    """Creates service time series metrics in Cloud Monitoring.

    Args:
        project_id: The Google Cloud project ID.
    """
    client = monitoring_v3.MetricServiceClient()
    name = f"projects/{project_id}"

    # Non-gauge metrics require start_time strictly before end_time and int64 values
    current_time = int(time.time())
    interval = monitoring_v3.TimeInterval(
        start_time={"seconds": current_time - 60, "nanos": 0},
        end_time={"seconds": current_time, "nanos": 0},
    )
    point = monitoring_v3.Point(
        interval=interval,
        value=monitoring_v3.TypedValue(int64_value=1),
    )

    series = monitoring_v3.TimeSeries(
        metric={
            "type": "istio.io/service/server/request_count",
            "labels": {"response_code": "200"},
        },
        resource={
            "type": "k8s_container",
            "labels": {
                "project_id": project_id,
                "location": "us-central1-c",
                "cluster_name": "example-cluster",
                "namespace_name": "default",
                "pod_name": "example-pod",
                "container_name": "example-container",
            },
        },
        points=[point],
    )
    time_series = [series]

    try:
        client.create_service_time_series(name=name, time_series=time_series)
        print(f"Created service time series for {name}")
    except exceptions.GoogleAPICallError as e:
        print(f"Failed to create service time series: {e}")
# [END monitoring_v3_metricservice_servicetimeseries_create]
