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
from datetime import datetime, timezone

# [START monitoring_v3_metricservice_timeseries_create]
from google.api_core import exceptions
from google.cloud import monitoring_v3
from google.protobuf import timestamp_pb2


def create_time_series_data(project_id: str) -> None:
    """
    Creates a new time series with a custom metric and sends a single data point.

    Args:
        project_id: The Google Cloud project ID to which to write the metric data.
    """
    client = monitoring_v3.MetricServiceClient()
    project_name = f"projects/{project_id}"

    # Prepare the time series data.
    series = monitoring_v3.TimeSeries()
    series.metric.type = "custom.googleapis.com/my_app/cpu_utilization"
    series.metric.labels["environment"] = "production"

    # Define the monitored resource.
    # This example uses a generic GCE instance resource.
    # In a real application, these labels would correspond to an actual resource.
    series.resource.type = "gce_instance"
    series.resource.labels["instance_id"] = "my-instance-123"
    series.resource.labels["zone"] = "us-central1-a"
    series.resource.labels["project_id"] = project_id

    # Create a point with a current timestamp and a sample value.
    now = datetime.now(timezone.utc)
    seconds = int(now.timestamp())
    nanos = int(now.microsecond * 1000)

    interval = monitoring_v3.TimeInterval(
        end_time=timestamp_pb2.Timestamp(seconds=seconds, nanos=nanos),
        # For GAUGE metrics, start_time should be the same as end_time.
        start_time=timestamp_pb2.Timestamp(seconds=seconds, nanos=nanos),
    )

    point = monitoring_v3.Point(
        interval=interval,
        value=monitoring_v3.TypedValue(double_value=0.75),  # Example CPU utilization
    )
    series.points.append(point)

    try:
        client.create_time_series(name=project_name, time_series=[series])
        print(f"Successfully wrote a data point for metric: {series.metric.type}")
        print(f"  Value: {point.value.double_value}")
        print(f"  Timestamp: {now.isoformat()}")
    except exceptions.InvalidArgument as e:
        print(
            f"Failed to write time series data due to InvalidArgument: {e}\n"
            "This often means the metric descriptor does not exist, or the "
            "metric/resource labels are incorrect. Ensure the metric "
            f"'{series.metric.type}' is created and its labels match the data being sent."
        )
    except Exception as e:
        print(f"An unexpected error occurred: {e}")


# [END monitoring_v3_metricservice_timeseries_create]

if __name__ == "__main__":
    parser = argparse.ArgumentParser(
        description="Creates a new time series with a custom metric and sends a single data point."
    )
    parser.add_argument(
        "--project_id",
        required=True,
        help="The Google Cloud project ID to which to write the metric data.",
    )
    args = parser.parse_args()
    create_time_series_data(project_id=args.project_id)
