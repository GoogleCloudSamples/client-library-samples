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

# [START capacityplanner_v1beta_usageservice_query_forecasts]
import google.api_core.exceptions
from google.cloud import capacityplanner_v1beta

client = capacityplanner_v1beta.UsageServiceClient()


def query_forecasts(project_id: str, location_id: str) -> None:
    """Queries capacity forecasts for a project and location.

    Args:
        project_id: The Google Cloud project ID.
        location_id: The Google Cloud region or location (for example, 'us-central1').
    """
    parent = f"projects/{project_id}/locations/{location_id}"
    cloud_resource_type = "gce-vcpus"

    request = capacityplanner_v1beta.QueryForecastsRequest(
        parent=parent,
        cloud_resource_type=cloud_resource_type,
    )

    try:
        response = client.query_forecasts(request=request)
        for forecast in response.forecasts:
            print(forecast)
    except google.api_core.exceptions.GoogleAPICallError as e:
        print(f"API call failed: {e}")
# [END capacityplanner_v1beta_usageservice_query_forecasts]
