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

# [START monitoring_v3_metricservice_timeseries_list]
import time

import google.api_core.exceptions
from google.cloud import monitoring_v3

client = monitoring_v3.MetricServiceClient()


def list_time_series(project_id: str) -> None:
    """Lists time series metrics matching a filter for a project.

    Args:
        project_id: The Google Cloud project ID on which to execute the request.
    """
    now = time.time()
    seconds = int(now)
    nanos = int((now - seconds) * 10**9)

    interval = monitoring_v3.TimeInterval(
        end_time={"seconds": seconds, "nanos": nanos},
        start_time={"seconds": seconds - 1200, "nanos": nanos},
    )
    filter = 'metric.type = "compute.googleapis.com/instance/cpu/utilization"'
    name = f"projects/{project_id}"
    view = monitoring_v3.ListTimeSeriesRequest.TimeSeriesView.FULL

    request = monitoring_v3.ListTimeSeriesRequest(
        name=name,
        filter=filter,
        interval=interval,
        view=view,
    )

    try:
        page_result = client.list_time_series(request=request)
        for time_series in page_result:
            print(f"Metric: {time_series.metric.type}")
            print(f"Resource type: {time_series.resource.type}")
            print(f"Data points count: {len(time_series.points)}")
    except google.api_core.exceptions.GoogleAPICallError as e:
        print(f"Request failed: {e}")
# [END monitoring_v3_metricservice_timeseries_list]
