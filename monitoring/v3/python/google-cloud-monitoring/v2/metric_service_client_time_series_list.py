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

# [START monitoring_list_time_series]
from datetime import datetime, timedelta
from google.api_core import exceptions
from google.cloud import monitoring_v3
from google.protobuf.timestamp_pb2 import Timestamp


def list_time_series_data(
    project_id: str,
    metric_type: str = "compute.googleapis.com/instance/cpu/usage_time",
    resource_type: str = "gce_instance",
    minutes_ago: int = 5,
) -> None:
    """Lists time series data for a given metric and resource type within a specified time range.

    Args:
        project_id: The Google Cloud project ID.
        metric_type: The type of the metric to query (e.g., "compute.googleapis.com/instance/cpu/usage_time").
            For example: "compute.googleapis.com/instance/cpu/usage_time".
        resource_type: The type of the monitored resource (e.g., "gce_instance").
            For example: "gce_instance".
        minutes_ago: The number of minutes ago to start querying data from.
    """
    # The `with` statement ensures the client's transport
    # resources are properly closed when the block is exited.
    with monitoring_v3.MetricServiceClient() as client:
        # [END monitoring_client_lifecycle]

        now = datetime.utcnow()
        end_time = Timestamp()
        end_time.FromDatetime(now)
        start_time = Timestamp()
        start_time.FromDatetime(now - timedelta(minutes=minutes_ago))

        interval = monitoring_v3.TimeInterval(
            start_time=start_time,
            end_time=end_time,
        )

        # The filter specifies which time series should be returned.
        # It must specify a single metric type and can additionally specify metric labels and other information.
        # For this example, we filter by metric type and resource type.
        query_filter = (
            f'metric.type = "{metric_type}" AND resource.type = "{resource_type}"'
        )

        # We request a 'FULL' view to get all data points.
        request = monitoring_v3.ListTimeSeriesRequest(
            name=f"projects/{project_id}",
            filter=query_filter,
            interval=interval,
            view=monitoring_v3.ListTimeSeriesRequest.TimeSeriesView.FULL,
        )

        print(f"Listing time series for project: {project_id}")
        print(f"  Metric type: {metric_type}")
        print(f"  Resource type: {resource_type}")
        print(f"  Time range: {minutes_ago} minutes ago to now")

        try:
            page_result = client.list_time_series(request=request)

            found_series = False
            for response in page_result:
                found_series = True
                print("\n--- Time Series Found ---")
                print(f"  Metric: {response.metric.type}")
                print(f"  Resource: {response.resource.type}")
                print(f"  Metric Labels: {dict(response.metric.labels)}")
                print(f"  Resource Labels: {dict(response.resource.labels)}")
                print("  Points:")
                for point in response.points:
                    # Points are returned in reverse time order (most recent to oldest).
                    point_time = point.interval.end_time.ToDatetime()
                    # The value can be of different types (int64_value, double_value, etc.)
                    # We convert the TypedValue to a JSON string for generic printing.
                    # Note: monitoring_v3.to_json is a utility function to serialize protobuf messages to JSON.
                    value = monitoring_v3.to_json(point.value)
                    print(f"    Time: {point_time}, Value: {value}")

            if not found_series:
                print("No time series data found matching the criteria.")

        except exceptions.NotFound as e:
            print(
                f"Error: One or more resources specified were not found. Details: {e}"
            )
            print(
                "Please ensure the project ID is correct and the metric/resource type exists."
            )
        except exceptions.InvalidArgument as e:
            print(f"Error: Invalid argument provided in the request. Details: {e}")
            print("Please check the metric type, resource type, and filter syntax.")
        except exceptions.GoogleAPICallError as e:
            print(f"An API error occurred: {e}")
            # For other API errors, log the full error for debugging.
            # In a real application, you might want more specific handling.
        except Exception as e:
            print(f"An unexpected error occurred: {e}")


# [END monitoring_list_time_series]

if __name__ == "__main__":
    parser = argparse.ArgumentParser(
        description="List time series data for a Google Cloud project."
    )
    parser.add_argument(
        "--project_id", required=True, help="Your Google Cloud project ID."
    )
    parser.add_argument(
        "--metric_type",
        default="compute.googleapis.com/instance/cpu/usage_time",
        help="The metric type to query.",
    )
    parser.add_argument(
        "--resource_type",
        default="gce_instance",
        help="The monitored resource type.",
    )
    parser.add_argument(
        "--minutes_ago",
        type=int,
        default=5,
        help="The number of minutes ago to start querying data from.",
    )

    args = parser.parse_args()

    list_time_series_data(
        project_id=args.project_id,
        metric_type=args.metric_type,
        resource_type=args.resource_type,
        minutes_ago=args.minutes_ago,
    )
