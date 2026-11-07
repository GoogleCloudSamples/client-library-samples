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

# [START monitoring_v3_queryservice_query_time_series]
import google.api_core.exceptions
from google.cloud import monitoring_v3

client = monitoring_v3.QueryServiceClient()


def query_time_series(project_id: str) -> None:
    """Use the query_time_series method

    Args:
        project_id: The Google Cloud project ID on which to execute the query.
    """
    name = f"projects/{project_id}"
    query = (
        "fetch gce_instance :: compute.googleapis.com/instance/cpu/utilization"
        " | within 5m"
    )

    try:
        request = monitoring_v3.QueryTimeSeriesRequest(
            name=name,
            query=query,
        )
        response = client.query_time_series(request=request)

        for data in response:
            print(f"Label values: {data.label_values}")
            print(f"Data points count: {len(data.point_data)}")
    except google.api_core.exceptions.GoogleAPICallError as error:
        print(f"QueryTimeSeries request failed: {error}")
# [END monitoring_v3_queryservice_query_time_series]
