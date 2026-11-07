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

# [START databasecenter_v1beta_databasecenter_aggregate_fleet]
import google.api_core.exceptions
from google.cloud import databasecenter_v1beta

client = databasecenter_v1beta.DatabaseCenterClient()


def aggregate_fleet(project_id: str) -> None:
    """Aggregates fleet statistics across database resources.

    Args:
        project_id: The Google Cloud project ID (for example, 'example-project-id')
    """
    parent = f"projects/{project_id}"

    request = databasecenter_v1beta.AggregateFleetRequest(
        parent=parent,
    )

    try:
        response = client.aggregate_fleet(request=request)
        print(f"Aggregation completed successfully: {response}")
    except google.api_core.exceptions.GoogleAPICallError as e:
        print(f"API call failed: {e}")
# [END databasecenter_v1beta_databasecenter_aggregate_fleet]
